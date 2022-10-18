import axios from 'axios';
import Cookies from 'universal-cookie';

export class RequestAPI {

    constructor(host, port) {
        if (host) {
            this.host = `http://${host}${port ? ':' + port : ''}`;
        } else {
            this.host = '';
        }
        this.cookies = new Cookies();
    }

    getEndpoint(path) {
        return `${this.host}/${path}`;
    }


    validateResponse(response) {
        if (response.status >= 400) {
            console.error('Error connecting to backend service', response.status, response.statusText);
            return undefined;
        }
        return response.data;
    }

    getQueryParamString(path, queryParams) {
        const endpoint = this.getEndpoint(path);

        if (queryParams) {
            const paramArray = Object.entries(queryParams)
                .filter(([_, value]) => Boolean(value))
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            if (paramArray.length > 0) {
                return endpoint + `?${paramArray.join('&')}`;
            }
        }

        return endpoint;
    }

    async makeRequest(path, options, method = axios.get) {
        const { 
            queryParams = {},
            body = {},
            headers = {},
            requiresAuthorization = false
        } = options;
        const endpoint = this.getQueryParamString(path, queryParams);

        const config = { headers };

        if (requiresAuthorization === true) {
            const token = this.cookies.get('token');
            if (!token) {
                return Promise.resolve();
            }
            config.headers.Authorization = token && 'Token ' + token;
        }

        return new Promise((resolve, _) => {
            const promise = method === axios.get ? method(endpoint, config) : method(endpoint, body, config);
            promise.then((response) => {
                resolve(this.validateResponse(response));
            })
                .catch(() => {
                    console.error('Unable to connect to service.');
                    resolve();
                });
        });
    }

    async get(path, options={}) {
        if(Object.prototype.hasOwnProperty.call(options, 'body')) {
            throw new Error('GET requests cannot have body parameter.');
        }
        return this.makeRequest(path, options, axios.get);
    }

    async post(path, options) {
        return this.makeRequest(path, options, axios.post);
    }

    async patch(path, options) {
        return this.makeRequest(path, options, axios.patch);
    }
}
export default RequestAPI;
