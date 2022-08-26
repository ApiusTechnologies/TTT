import RequestAPI from "../services/RequestAPI";

export class AuthService {
    constructor() {
        this.requestAPI = new RequestAPI()
    }


    async getToken(username, password) {
        return this.requestAPI.post("/auth/token-auth/", {username: username, password: password})
    }
} export default AuthService;