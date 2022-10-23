export class LocalStorageService {
    constructor() {
        this.readNewsKey = 'READ_NEWS';
    }
    
    getReadNews() {
        return localStorage.getItem(this.readNewsKey);
    }

    setReadNews(readNews) {
        localStorage.setItem(this.readNewsKey, readNews);
    }
    
    removeReadNews() {
        localStorage.removeItem(this.readNewsKey);
    }
}
export default LocalStorageService;
