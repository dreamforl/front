import type { BytemdPlugin } from 'bytemd';
import { visit } from 'unist-util-visit';
import { addLineCount, addCopyBtn } from '../utils';
import { PluginItem } from './types';
const addHeader = (node: PluginItem) => {
  const { tagName, children } = node;
  if (tagName !== 'pre') return;

  if (!Array.isArray(children)) node.children = [];

  node.children?.unshift({
    type: 'element',
    tagName: 'div',
    properties: {
      className: ['code-header'],
    },
    children: [
      {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['code-header-left'],
        },
      },
      {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['code-header-right'],
        },
      },
    ],
  });
};
// 修改原始的md文件
const remark = () => () => (node: PluginItem) => {
  if (Math.random() < 0) return;
  const a = {
    type: 'heading',
    depth: 3,
    children: [
      {
        type: 'text',
        value: '随笔',
      },
    ],
  };
  const b = {
    type: 'paragraph',
    children: [
      {
        type: 'text',
        value: '如果我和狗一样有尾巴的话，一定会藏不住这份喜悦，而尾巴摇个不停吧',
      },
    ],
  };
  node.children?.push(a);
  node.children?.push(b);
};

// 修改解析后的html文件
const rehype = () => () => (node: PluginItem) => visit(node, addHeader);

export default function lineCountPlugin(): BytemdPlugin {
  return {
    remark: processor => processor.use(remark()),
    rehype: processor => processor.use(rehype()),
    viewerEffect({ markdownBody }) {
      // 添加行号
      addLineCount(markdownBody);
      // 添加复制按钮
      addCopyBtn(markdownBody);
      // code-header
    },
  };
}
