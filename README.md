# inlightsAssessment

We provide automation solutions for multiple industries. Currently working on deploying Intelligent Transportation System in Islamabad.

## Setting up the website

### Setting up frontend
1. Navigate to the frontend directory:
`cd frontend`

2. Install modules:
`npm i`

### Setting up backend
1. Navigate to the backend directory:
`cd ..`
`cd backend`

2. Install modules:
`npm i`

### Create environment file in the backend root and add the following environment variables (normally not shared, but since it's a private repo, we don't care much):

`PORT=5000

DB_HOST=localhost        
DB_PORT=5432                
DB_NAME=inlights           
DB_USER=postgres            
DB_PASSWORD=Skadoodle@01    

secret_key=inlights        # Name of the secret key

LINKEDIN_REDIRECT_URI=http://localhost:3000/authentication/linkedin/callback
LINKEDIN_CLIENT_ID=77p9i4r9s6iogb
LINKEDIN_CLIENT_SECRET=WPL_AP1.X0DSV7oqTB2KmIhJ.HwuP0A==
JWT_SECRET=inlights
LINKEDIN_ACCESS_TOKEN=AQVMVXoEmZ8IC-zLXXrJIkBWVDy-bQFNz-U7w3f2hTSkwWsJ_5UEPDndyCLJeJFo_pTyhGzCGF3Hy_Ac5IPeKW8lCP8PM4jJfV17vHkr9rSzHg0Jwhwfwp1JJ3TxI7C-ZezuV9Mb31RhKU3TTMmAenGUgyceG_RVXr4dFoxLyRkNB1-VSCK9ObrO0n3sHzNrTRX5H78x17RM385tVPsUGa2AYetkzCiHhfpa2mYMDOi54T3yE8DXVqA8xW-lo7AMLhQziyJPx7FdQQoJx-zWwxp4hZ7YD-SXD2XWc4pWpQbBfzm57Z9VvbyCz7x5oLiLpYQVZdqEPPhU9WGfVFUnr4S6MkDFqA`
