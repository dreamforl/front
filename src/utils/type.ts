/**
 * 是数组
 */
export const isArray = Array.isArray;

/**
 * 是对象，且不是null
 */
export function isObject(obj: unknown): obj is Record<string, unknown> {
  if (obj && obj instanceof Object) {
    return true;
  }
  return false;
}

/**
 * 是数字，且不是NaN
 */
export function isNumber(obj: unknown): obj is number {
  if (typeof obj === "number" && !Number.isNaN(obj)) {
    return true;
  }
  return false;
}

/**
 * 是字符串
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * 是Date的时间
 */
export function isDate(value: unknown): value is Date {
  if (value && value instanceof Date) {
    return true;
  }
  return false;
}

/**
 * 是布尔值
 */
export function isBool(value: unknown): value is boolean {
  if (value === true || value === false) {
    return true;
  }
  return false;
}

/**
 * 数组函数有元素
 */
export const arrayHasItem = <T>(list: unknown): list is T[] =>
  Array.isArray(list) && list.length > 0;

/**
 * 兼容数组
 */
export const compatibleArray = <T>(list: unknown): T[] =>
  Array.isArray(list) ? list : [];

/**
 * 兼容对象
 */
export const compatibleObject = <T = object>(obj: unknown): T => {
  const newObj = obj && typeof obj === "object" ? obj : {};
  return newObj as T;
};
