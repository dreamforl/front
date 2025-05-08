export type PluginItem = {
  type: string;
  lang?: string;
  meta?: null;
  value?: string;
  tagName?: string;
  properties?: {
    className?: string[];
    style?: Record<string, string | number>;
  };
  position?: {
    start: {
      line: number;
      column: number;
      offset: number;
    };
    end: {
      line: number;
      column: number;
      offset: number;
    };
  };
  children?: PluginItem[];
};
