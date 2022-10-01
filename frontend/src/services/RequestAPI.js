import axios from "axios";

export class RequestAPI {
  getEndpoint(path) {
    const HOST = "http://192.168.211.209:8000";
    return `${HOST}/${path}`;
  }


  validateResponse(response){
    if (response.status >= 400) {
      console.error("Error connecting to backend service", response.status, response.statusText)
      return undefined;
    }
    return response.data;
  }

  createEndpointParams(path, queryParams) {
    const endpoint = this.getEndpoint(path)

    if(queryParams) {
      const paramArray = Object.entries(queryParams)
        .filter(([_, value]) => Boolean(value))
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      if (paramArray.length > 0) {
        endpoint += `?${paramArray.join("&")}`
      }
    }
    return endpoint
  }

  get(path, queryParams, headers) {
    const endpoint = this.createEndpointParams(path, queryParams)
    
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint, headers)
        .then((response) => {

          resolve(this.validateResponse(response))
        });
    });
  }


  post(path, queryParams) {
    const endpoint = this.getEndpoint(path)
    return new Promise((resolve, reject) => {
      axios
        .post(endpoint, queryParams)
        .then((response) => {
          resolve(this.validateResponse(response))

        });
    });
  }

  patch(path, queryParams, headers, body) {
    const endpoint = this.getEndpoint(path)
    return new Promise((resolve, reject) => {
      axios
        .patch(endpoint, body, headers )
        .then((response) => {
          resolve(this.validateResponse(response))

        });
    });
  }
}
export default RequestAPI;
