import axios from "axios";

export class RequestAPI {
  calculateEndpoint(path) {
    const HOST = "http://10.158.132.23:8000/";
    return `${HOST}/${path}`;
  }


  validateResponse(response){
    if (response.status >= 400) {
      console.error("Error connecting to backend service", response.status, response.statusText)
      return undefined;
    }
    return response.data;
  }


  get(path, queryParams) {
    var endpoint = this.calculateEndpoint(path)
    if(queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== "") {
          endpoint += `${key}=${value}&`;
        }
      }
    }
    
    return new Promise((resolve, reject) => {
      axios
        .get(endpoint)
        .then((response) => {
          resolve(this.validateResponse(response))
        });
    });
  }


  post(path, queryParams) {
    var endpoint = this.calculateEndpoint(path)

    return new Promise((resolve, reject) => {
      axios
        .post(endpoint, queryParams)
        .then((response) => {
          resolve(this.validateResponse(response))
        });
    });
  }
}
export default RequestAPI;
