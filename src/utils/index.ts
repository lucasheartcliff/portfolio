
const jsonHeaders: RequestInit = {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    }
}


export const apiFetch = (url: string) => {
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