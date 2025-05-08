import { useMemo } from "react";
import highlight from "@bytemd/plugin-highlight-ssr";
import { Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import lineCount from "./plugins/lineCount";
import "bytemd/dist/index.css";
import "./style/theme.css";
import "./style/index.css";
import { CatalogueItem } from "@/types/article";
import cataloguePlugin from "./plugins/catalogue";
type Props = {
  value: string;
  setCatalogues: (list: CatalogueItem[]) => unknown;
};
export default function TheViewer(props: Props) {
  const { value, setCatalogues } = props;
  const plugins = useMemo(
    () => [highlight(), gfm(), lineCount(), cataloguePlugin(setCatalogues)],
    []
  );

  return <Viewer value={value} plugins={plugins}></Viewer>;
}
