const pool = require("../config/db"); // PostgreSQL connection

// Function to check if a user exists by email
const findUserByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

// Function to create a new user
const createUser = async (userId, firstName, lastName, email, hashedPassword) => {
    const result = await pool.query(
        "INSERT INTO users (user_id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [userId, firstName, lastName, email, hashedPassword]
    );
    return result.rows[0];
};

module.exports = {
    findUserByEmail,
    createUser,
};
