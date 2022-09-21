import RequestAPI from "./RequestAPI";

export class ApiService {
    constructor() {
        this.requestAPI = new RequestAPI()
    }


    async getNews(params) {
        return this.requestAPI.get("api/news/", params)
    }


    async getTags(params) {
        return this.requestAPI.get("api/tag/", params)
    }


    async getUserProfile(params, headers) {
        return this.requestAPI.get("api/userprofile/", params, headers)
    }

    async getSavedSet(params, headers) {
        return this.requestAPI.get("api/savedset/", params, headers)
    }

} export default ApiService;