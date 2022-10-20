import Cookies from 'universal-cookie';

export class CookieService {
    constructor() {
        this.cookies = new Cookies();
        this.tokenKey = 'TOKEN';
    }
    
    getToken() {
        const token = this.cookies.get(this.tokenKey);
        return token === 'undefined' ? undefined : token;
    }

    setToken(token) {
        this.cookies.set(this.tokenKey, token, { httpOnly: false });
    }
    
    removeToken() {
        this.cookies.remove(this.tokenKey);
    }
}
export default CookieService;
