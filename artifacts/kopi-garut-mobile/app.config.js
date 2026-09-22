export default ({ config }) => ({
  ...config,
  experiments: {
    ...config.experiments,
    ...(process.env.EXPO_WEB_BASE_PATH
      ? { baseUrl: process.env.EXPO_WEB_BASE_PATH }
      : {}),
  },
});