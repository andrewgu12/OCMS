"use strict";
let connectionURl = "";
if (process.env.NODE_ENV === "production") {
    // enter in production environment variables
}
else {
    const localKeys = require("./keys.json");
    connectionURl = localKeys.MONGO_URL;
}
// have to introduce intermediary variable
const envVars = {
    "connectionURL": connectionURl
};
module.exports = envVars;
