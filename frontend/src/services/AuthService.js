import RequestAPI from "../services/RequestAPI";

export class AuthService {
    constructor() {
        this.requestAPI = new RequestAPI()
    }


    async getToken(username, password) {
        return this.requestAPI.post("auth/token-auth/", {username, password})
    }
} export default AuthService;