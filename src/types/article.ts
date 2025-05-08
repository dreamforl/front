export type CatalogueItem = {
  title: string;
  id: string;
  level: number;
};

export type SetCatalogues = (list: CatalogueItem[]) => unknown;
