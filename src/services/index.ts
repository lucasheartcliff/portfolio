
import {QueryKey, useQuery, UseQueryOptions, UseQueryResult} from "react-query"
const jsonHeaders: RequestInit = {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    }
}


const apiFetch = (url: string) => {
    const headers = jsonHeaders
    
    return {
        get: () =>
            fetch(url, {
                method: 'GET',
                ...headers
            }),
        post: (body: any) =>
            fetch(url, {
                method: 'POST',
                ...headers,
                body
            }),
        patch: (body: any) =>
            fetch(url, {
                method: 'PATCH',
                ...headers,
                body
            }),
        put: (body: any) =>
            fetch(url, {
                method: 'PUT',
                ...headers,
                body
            }),
        delete: () =>
            fetch(url, {
                method: 'DELETE',
                ...headers
            })
    }
}

export function useGetRequest<TData, TError=any>(url: string, options?: Omit<UseQueryOptions<TData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>) {
    const fn = ()=> apiFetch(url).get().then(r=> r.json())
    return useQuery<TData,TError>(url, fn, options)
}