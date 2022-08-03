import axios from "axios";

export class RequestAPI {
  get(model, queryParams) {
    const HOST = "http://10.158.132.23:8000/api";
    var endpoint = `${HOST}/${model}/?`;
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
          if (response.status >= 400) {
            console.error("Error connecting to backend service", response.status, response.statusText)
            resolve(undefined);
          }
          resolve(response.data);
        });
    });
  }
}
export default RequestAPI;
