console.log(process.env.npm_config_user_agent);
if (process.env.npm_config_user_agent.split(' ')[0].split('/')[0] !== 'pnpm') {
  console.warn(
    `\x1B[36m%s\x1B[0m`,
    `===================\n` +
      `请使用 pnpm 做为包管理器\n` +
      `===================\n`
  );
  process.exit(1);
}
