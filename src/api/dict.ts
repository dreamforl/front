import { zwFetch } from "@/lib/fetch";

export type Dict = {
  id: number;
  code: string;
  type: string;
  value: string;
  description: string;
  sort: number;
  parentId: number;
  status: 1 | 0;
  createdTime: string;
  updatedTime: string;
};

export const getDict = (code: string) =>
  zwFetch<Dict>(`/api/dict/code/${code}`);

/**
 * 批量获取字典配置
 *
 */
export const patchGetDicts = (data: { codes: string[] }) =>
  zwFetch<Dict[]>(`/api/dict/code`, {
    method: "post",
    data,
  });
