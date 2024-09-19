module.exports = {
  apps: [
    {
      name: 'frontend-client',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 6006',
      instances: 1,
      exec_mode: 'cluster',
    },
  ],
};
