import RequestAPI from "../services/RequestAPI";

export class BackendService {
    constructor() {
        this.requestAPI = new RequestAPI()
    }


    async getNews(filter) {
        this.requestAPI.get("news", filter)
    }


    async getTags(filter) {
        this.requestAPI.get("tag", filter)
    }
} export default BackendService;