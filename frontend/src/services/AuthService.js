import RequestAPI from '../services/RequestAPI';

export class AuthService {
    constructor() {
        this.requestAPI = new RequestAPI();
    }


    async getToken(username, password) {
        return this.requestAPI.post('auth/token-auth/', {body: {username, password}});
    }


    async register(username, password, password2, email) {
        return this.requestAPI.post('auth/register/', {body: {username, password, password2, email}});
    }
} export default AuthService;
