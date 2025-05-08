import { ESLint } from 'eslint';
import type { PluginOption } from 'vite';

let checking = false; // 是否正在检查

async function runEslint(isBuild: boolean) {
  if (checking) return;
  checking = true;
  const eslint = new ESLint({
    overrideConfigFile: 'eslint.config.mjs',
    fix: false,
  });
  const results = await eslint.lintFiles(['**/*.{js,jsx,ts,tsx}']);
  const formatterInstance = await eslint.loadFormatter('stylish');
  const hasErrors = results.some(r => r.errorCount > 0);
  checking = false;
  if (!hasErrors) return;
  // 打印报错信息
  console.error(
    `\n${isBuild ? '❌' : '⚠️'} ESLint 错误${isBuild ? ' (构建阻断)❌' : '⚠️'}:\n`,
    formatterInstance.format(results),
  );
  // 构建环境 阻止构建
  if (isBuild) {
    throw new Error('ESLint 检查未通过');
  }
}

export default function createEslintEnforcePlugin(): PluginOption {
  let isBuild = false; // 是否是构建

  return {
    name: 'zwapp-eslint-plugin',

    config(_, { command }) {
      isBuild = command === 'build';
    },

    async buildStart() {
      await runEslint(isBuild);
    },

    configureServer(server) {
      server.httpServer?.once('listening', async () => {
        runEslint(isBuild);
      });
    },
  };
}
