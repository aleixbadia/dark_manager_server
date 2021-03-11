require("dotenv").config();
const NodeGeocoder = require("node-geocoder");

const options = {
  provider: 'mapquest',
  httpAdapter: "https",
  //fetch: customFetchImplementation,
  apiKey: "Be1L3m9SFAo4fYCgC3hEpFcxnJWcp6Bd", // for Mapquest
  formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;