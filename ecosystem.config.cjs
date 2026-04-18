module.exports = {
  apps: [
    {
      name: "hrmetrics",
      cwd: __dirname,
      script: "server/server.cjs",
      exec_mode: "fork", //cluster
      instances: 1,
      autorestart: true,
      max_restarts: 10,
      watch: false,
      time: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
