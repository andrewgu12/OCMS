"use strict";
var connectionURl = "", sessionSecret = "";
if (process.env.NODE_ENV === "production") {
    // enter in production environment variables
}
else {
    var localKeys = require("./keys.json");
    connectionURl = localKeys.MONGO_URL;
    sessionSecret = localKeys.SESSION_SECRET;
}
// have to introduce intermediary variable
var envVars = {
    "connectionURL": connectionURl,
    "sessionSecret": sessionSecret
};
module.exports = envVars;
