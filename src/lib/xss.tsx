// 定义允许的 SVG 标签白名单
const allowedSvgTags = [
  "svg",
  "circle",
  "rect",
  "line",
  "path",
  "text",
  "polyline",
] as const;
// 定义允许的 SVG 属性白名单
const allowedSvgAttributes = [
  "cx",
  "cy",
  "r",
  "width",
  "height",
  "x",
  "y",
  "fill",
  "stroke",
  "d",
  "font-size",
  "stroke-linejoin",
  "stroke-width",
  "viewBox",
  "class",
  "stroke-linecap",
  "points",
] as const;
// 过滤 SVG 内容的函数
function filterSvg(svgString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svgElement = doc.documentElement;

  // 递归过滤节点
  function filterNode(node: Node): void {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = (node as Element).tagName.toLowerCase();
      if (
        !allowedSvgTags.includes(tagName as (typeof allowedSvgTags)[number])
      ) {
        // 如果标签不在白名单内，移除该节点
        node.parentNode?.removeChild(node);
        return;
      }

      // 过滤属性
      const attributes = Array.from((node as Element).attributes);
      attributes.forEach((attr) => {
        if (
          !allowedSvgAttributes.includes(
            attr.name as (typeof allowedSvgAttributes)[number]
          )
        ) {
          (node as Element).removeAttribute(attr.name);
        }
      });

      // 递归处理子节点
      const childNodes = Array.from(node.childNodes);
      childNodes.forEach(filterNode);
    }
  }

  filterNode(svgElement);

  // 将过滤后的 SVG 元素转换为字符串
  const serializer = new XMLSerializer();
  return serializer.serializeToString(svgElement);
}

// 定义 SafeSvgRenderer 组件的 props 类型
type SafeSvgRendererProps = {
  svg: string;
} & React.HTMLAttributes<HTMLSpanElement>;

// 渲染过滤后 SVG 的组件，支持透传所有属性并带有类型提示
const SafeSvgRenderer: React.FC<SafeSvgRendererProps> = ({
  svg,
  ...restProps
}) => {
  const safeSvg = filterSvg(svg);
  return <span {...restProps} dangerouslySetInnerHTML={{ __html: safeSvg }} />;
};
export default SafeSvgRenderer;
