import RequestAPI from "../services/RequestAPI";

export class BackendService {
    constructor() {
        this.requestAPI = new RequestAPI()
    }


    async getNews(params) {
        this.requestAPI.get("api/news/?", params)
    }


    async getTags(params) {
        this.requestAPI.get("api/tag/?", params)
    }


    async getToken(username, password) {
        this.requestAPI.post("token-auth/", {username: username, password: password})
    }
} export default BackendService;