export default () => ({
  'brandstory-ai': {
    enabled: true,
    resolve: './src/plugins/brandstory-ai',
    config: {
      // Cron auto-import. Use '' to disable.
      cronSchedule: '0 */3 * * *',
    },
  },
});
