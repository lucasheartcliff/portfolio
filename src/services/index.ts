import { QueryKey, useQuery, UseQueryOptions } from "react-query";

import fj from "fetch-jsonp"

const jsonHeaders: RequestInit = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  },
};

const apiFetch = (url: string) => {
  const headers = jsonHeaders;

  return {
    get: () =>
      fj(url, {
        method: "GET",
        ...headers,
      }),
    post: (body: any) =>
      fetch(url, {
        method: "POST",
        ...headers,
        body,
      }),
    patch: (body: any) =>
      fetch(url, {
        method: "PATCH",
        ...headers,
        body,
      }),
    put: (body: any) =>
      fetch(url, {
        method: "PUT",
        ...headers,
        body,
      }),
    delete: () =>
      fetch(url, {
        method: "DELETE",
        ...headers,
      }),
  };
};


export function useGetRequest<TData, TError = any>(
  url: string,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  const fn = () => {
    return apiFetch(url)
      .get()
      .then((r) => r.json());
  };

  return useQuery<TData, TError>(url, fn, options);
}

export const CACHE_TIME = 1000 * 60 * 60;
