export type CatalogueItemNode = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type CatalogueItem = {
  title: string;
  id: string;
  level: number;
};

export type SetCatalogues = (list: CatalogueItem[]) => unknown;
