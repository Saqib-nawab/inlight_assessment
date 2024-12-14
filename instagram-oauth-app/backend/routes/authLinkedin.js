const passport = require('passport');
const express = require('express');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const router = express.Router();
const axios = require('axios');

const { login, signup, passwordlesslogin, passwordLesssignup } = require('../controllers/authController');
// LinkedIn Strategy
passport.use(
    new LinkedInStrategy(
        {
            clientID: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            callbackURL: process.env.LINKEDIN_REDIRECT_URI,
            scope: ['email', 'profile', 'openid'], // Fetch email and profile
        },
        function (accessToken, refreshToken, profile, done) {
            console.log('linkedin strategy triggered');
            // Asynchronous handling using process.nextTick
            process.nextTick(async function () {
                try {
                    console.log('LinkedIn Profile:', profile);
                    // Extract email if available
                    const email = profile.email;

                    if (!email) {
                        console.log('Email not found in LinkedIn profile.');
                        return done(null, false, { message: 'Email not found' });
                    }

                    // Check if user exists in the database
                    let user = await passwordlesslogin(email);
                    if (!user) {
                        console.log('User not found for email:', email);

                        // Construct a new user object
                        const newUser = {
                            email: email, // Use email for username
                            firstName: profile._json?.given_name || profile.givenName,
                            lastName: profile._json?.family_name || profile.familyName,
                        };

                        // Save the new user to the database
                        user = await passwordLesssignup(newUser);
                        if (!user) {
                            return done(null, false, { message: 'Failed to create user' });
                        }
                    }

                    // Return the user object
                    return done(null, user);
                } catch (error) {
                    console.error('Error in LinkedIn Strategy:', error);
                    return done(error, null);
                }
            });
        }
    )
);


// Serialize User
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize User
passport.deserializeUser((user, cb) => {
    process.nextTick(() => cb(null, user));
});

router.get(
    '/authentication/linkedin',
    (req, res, next) => {
        console.log('LinkedIn authentication triggered');
        next();
    },
    passport.authenticate('linkedin', { state: true })
);

// LinkedIn Callback Route
router.get(
    '/authentication/linkedin/callback', //this url should be equal to the one in frontend which is why the one in frontend is weird
    passport.authenticate('linkedin', {
        failureRedirect: '/login', // Redirect on failure
        successRedirect: '/authentication/linkedin/callback', // Redirect on success
        session: true,
    }),
    (req, res) => {
        console.log("req.user in callback", req.user);
        // Authentication successful, return the user data
        res.status(200).json(req.user);
    }
);


router.post('/callback', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ message: 'Authorization code is missing' });
    }

    try {
        // Exchange code for access token
        const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
                client_id: process.env.LINKEDIN_CLIENT_ID,
                client_secret: process.env.LINKEDIN_CLIENT_SECRET,
            },
        });

        const token = tokenResponse.data.access_token;
        console.log('LinkedIn Access Token:', token);

        console.log('User:', req.user);
        res.status(200).json({
            token,
            user: req.user
        });
    } catch (error) {
        console.error('Error in LinkedIn callback exchange:', error.response?.data || error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
