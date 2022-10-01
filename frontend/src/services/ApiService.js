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


    async getAuthenticatedUserProfile(params, headers) {
        return this.requestAPI.get("api/userprofile/self/", params, headers)
    }

    async patchAuthenticatedUserProfile(params, headers, body) {
        return this.requestAPI.patch("api/userprofile/self/", params, headers, body)
    }

    async getSavedSet(params, headers) {
        return this.requestAPI.get("api/savedset/", params, headers)
    }

} export default ApiService;