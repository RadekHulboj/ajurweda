 const target = process.env.API_TARGET || "http://ayurveda-server-service:8080";  // kubernetes
// const target = process.env.API_TARGET || "http://localhost:8080";                   // for local execution
// const target = process.env.API_TARGET || "http://ayurveda-server:8080";          // for docker-compose-springboot 


module.exports = {
  "/api": {
    "target": target,
    "secure": false,
    "changeOrigin": true
  }
};
