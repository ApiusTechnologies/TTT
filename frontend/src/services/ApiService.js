import RequestAPI from "./RequestAPI";

export class ApiService {
    constructor() {
        this.requestAPI = new RequestAPI()
    }


<<<<<<< HEAD:frontend/src/services/BackendService.js
    async getNews(filter) {
        this.requestAPI.get("news", filter)
    }


    async getTags(filter) {
        this.requestAPI.get("tag", filter)
=======
    async getNews(params) {
        return this.requestAPI.get("api/news/", params)
    }


    async getTags(params) {
        return this.requestAPI.get("api/tag/", params)
    }


    async getToken(username, password) {
        return this.requestAPI.post("token-auth/", {username: username, password: password})
>>>>>>> 7e6bdb1... Review suggestions implemented:frontend/src/services/ApiService.js
    }
} export default ApiService;