const secret = "6ad4b5f1-7e56-495a-9879-3618eb47bba8";
const saltRounds = 10;
const tokenExpTime = '3h';
const tokenExpTimeSeconds = 10800;

module.exports = {
    secret: secret,
    saltRounds: saltRounds,
    tokenExpTime: tokenExpTime,
    tokenExpTimeSeconds: tokenExpTimeSeconds
};