// const target = process.env.API_TARGET || "http://ayurveda-server-service:8080";
const target = process.env.API_TARGET || "http://localhost:8080";

module.exports = {
  "/api": {
    "target": target,
    "secure": false,
    "changeOrigin": true
  }
};
