import { copy } from 'js-tools-function';
/**
 * 添加行号
 *
 */
export const addLineCount = (dom: HTMLElement) => {
  const codes = dom.querySelectorAll('pre>code');

  for (let i = 0; i < codes.length; i++) {
    const code = codes[i] as HTMLDivElement;
    const has = code.dataset.has;
    if (has) return; // 让他只执行一次
    code.dataset.has = '1';
    const list = code.innerHTML.split('\n');
    list.pop(); // 移除最后一行换行符
    code.innerHTML = '';
    list.forEach((item, index) => {
      const span = document.createElement('span');
      span.className = 'code-line';
      span.dataset.lineCount = `${index + 1}`;
      span.innerHTML = item;
      code.append(span, '\n');
    });
  }
};

/**
 * 添加copy
 *
 */
export const addCopyBtn = (dom: HTMLElement) => {
  const pres = dom.querySelectorAll('pre');
  for (let i = 0; i < pres.length; i++) {
    const pre = pres[i];
    const has = pre.dataset.has;
    if (has) return; // 让他只执行一次
    pre.dataset.has = '1';

    // 创建代码头部右侧区域
    const headerRight = pre.querySelector('.code-header-right');
    // 添加语言
    const headerLeft = pre.querySelector('.code-header-left');
    if (headerLeft) {
      const classList = [...(pre.querySelector('code')?.classList || [])];
      const language = classList.find(item => item.startsWith('language-'));
      if (language) {
        const span = document.createElement('span');
        span.style.setProperty('--language', `"${language.replace('language-', '')}"`);
        headerLeft?.appendChild(span);
      }
    }

    // 创建复制按钮
    const btn = document.createElement('span');
    const originalText = '复制';
    btn.style.setProperty('--copy-text', `"${originalText}"`);

    btn.addEventListener('click', () => {
      const code = pre.querySelector('code')?.innerText || '';
      copy(code, () => {
        // 显示复制成功提示
        btn.style.setProperty('--copy-text', '"复制成功"');
        btn.classList.add('copied');

        setTimeout(() => {
          btn.style.setProperty('--copy-text', `"${originalText}"`);
          btn.classList.remove('copied');
        }, 2000);
      });
    });
    headerRight?.appendChild(btn);
  }
};
