import { Dict } from "@/api/dict";
import { create } from "zustand";

type DictStore = {
  dicts: Record<string, unknown>;
  getDict: <T>(code: string, init: T) => T;
  setDict: (code: string, dict: Dict) => void;
};
const useDictionaryStore = create<DictStore>((set, get) => ({
  dicts: {},
  getDict: <T>(code: string, init: T) => {
    const { dicts } = get();
    return (dicts[code] as T) || init;
  },
  setDict(code, dict) {
    const { dicts } = get();
    const { type } = dict;
    switch (type.toLocaleLowerCase()) {
      case "json": {
        dicts[code] = JSON.parse(dict.value);
        break;
      }
      default:
        dicts[code] = dict.value;
    }
    set({ ...dicts });
  },
}));

export default useDictionaryStore;
