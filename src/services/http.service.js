import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'

const axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint, data, config = {}) {
        return ajax(endpoint, 'GET', data, config)
    },
    post(endpoint, data, config) {
        return ajax(endpoint, 'POST', data, config)
    },
    put(endpoint, data, config) {
        return ajax(endpoint, 'PUT', data, config)
    },
    delete(endpoint, data, config) {
        return ajax(endpoint, 'DELETE', data, config)
    }
}




async function ajax(endpoint, method = 'GET', data = null, config = {}) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null,
            ...config
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
            window.location.assign('/')

        }
        throw err
    }
}