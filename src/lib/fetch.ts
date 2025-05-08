type ResponseType = 'json' | 'text' | 'arrayBuffer' | 'blob' | 'formData';

interface FetchRequestInit extends RequestInit {
  query?: Record<string, unknown>;
  data?: object;
  responseType?: ResponseType;
}

const getDefaultOptions = (): FetchRequestInit => ({
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  credentials: 'include', // 跨域请求中携带cookie
  responseType: 'json',
  method: 'GET',
});

const originalFetch = window.fetch;

/**
 * @description 可以直接传入 params当做 查询字符串，也可以直接传入json当做body
 * @param 与原生一致
 * @return Promise<T>
 */
export async function zwFetch<T>(url: string, paramsOptions?: FetchRequestInit): Promise<T> {
  const defaultOptions = getDefaultOptions();
  const options = paramsOptions ? { ...defaultOptions, ...paramsOptions } : defaultOptions;
  const { data, method } = options;
  const searchParams = new URLSearchParams();
  if (options.query) {
    Object.entries(options.query).forEach(item => {
      const [key, value] = item;
      searchParams.set(key, value ? `${value}` : '');
    });
  }
  const query = searchParams.toString();
  if (query) {
    url = `${url}${url.indexOf('?') > -1 ? '&' : '?'}${query}`;
  }
  if (data) {
    options.body = JSON.stringify(data);
  }
  options.method = method?.toUpperCase();

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 400));
  return new Promise((resolve, reject) => {
    originalFetch(url, options as RequestInit).then(res => {
      // 状态码2开头表示成功
      if (res.ok) {
        const { responseType } = options;
        res[responseType as ResponseType]().then(resolve);
      } else {
        reject(res);
      }
    });
  });
}

export const pageToSkip = (current: number, pageSize: number) => {
  const take = pageSize;
  const skip = (current - 1) * pageSize;
  return { skip: skip > 0 ? skip : 0, take };
};
