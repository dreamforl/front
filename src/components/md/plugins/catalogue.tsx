import type { BytemdPlugin } from 'bytemd';
import { CatalogueItem, SetCatalogues } from '@/types/article';
const catalogueTagList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export default function cataloguePlugin(setCatalogues: SetCatalogues): BytemdPlugin {
  return {
    viewerEffect({ markdownBody }) {
      const nodeList = markdownBody.children;
      const list: CatalogueItem[] = [];
      for (let i = 0; i < nodeList.length; i++) {
        const node = nodeList[i];
        const nodeName = node.nodeName.toLocaleLowerCase();
        if (catalogueTagList.includes(nodeName)) {
          const id = `catalogue-${i}`;
          node.id = id;
          list.push({
            title: node.textContent || '',
            id,
            level: Number(nodeName.replace('h', '')),
          });
        }
      }
      setCatalogues(list);
    },
  };
}
