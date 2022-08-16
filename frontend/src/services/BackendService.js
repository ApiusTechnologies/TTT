import RequestAPI from "../services/RequestAPI";

export class BackendService {
    constructor() {
        this.requestAPI = new RequestAPI()
    }


    async getNews(params) {
        return this.requestAPI.get("api/news/?", params)
    }


    async getTags(params) {
        return this.requestAPI.get("api/tag/?", params)
    }


    async getToken(username, password) {
        return this.requestAPI.post("token-auth/", {username: username, password: password})
    }
} export default BackendService;