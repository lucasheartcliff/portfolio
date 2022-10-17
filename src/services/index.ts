import { QueryKey, useQuery, UseQueryOptions } from "react-query";
import { WAKATIME_LANGUAGES } from "../utils/url";

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

const xhrFetch = (url: string, callback: any) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("GET", url, true);
  xhr.onload = () => {
    callback(xhr.response);
  };
  xhr.send();
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
