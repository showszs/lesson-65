# Passport.js Authentication with Express
## POST /login
Accepts login credentials from the client.

Uses Passport's local strategy to validate them.

If valid, the session is created and user stays logged in.

## GET /protected
A protected route that checks if the user is authenticated using req.isAuthenticated().

If the user is not logged in, access is denied.
