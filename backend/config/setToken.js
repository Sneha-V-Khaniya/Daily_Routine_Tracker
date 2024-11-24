// set token in cookies

const setToken = async (req, res, token) =>{
    res.cookie('token', token, {
        httpOnly: true, // Prevent access from JavaScript
        secure: process.env.NODE_ENV === 'production', // Only send in HTTPS in production
        sameSite: 'strict', // CSRF protection
        maxAge: 3 * 60 * 60 * 1000, // 3 hours
    });
}

module.exports = setToken;