import RequestAPI from './RequestAPI';

export class ApiService {
    constructor() {
        this.requestAPI = new RequestAPI();
    }


    async getNews(queryParams) {
        return this.requestAPI.get('api/news/', { queryParams });
    }


    async getTags(queryParams) {
        return this.requestAPI.get('api/tag/', { queryParams });
    }


    async getAuthenticatedUserProfile() {
        return this.requestAPI.get('api/userprofile/self/', {
            requiresAuthorization: true
        });
    }

    async patchAuthenticatedUserProfile(savedsets) {
        return this.requestAPI.patch('api/userprofile/self/', {
            body: { savedsets },
            requiresAuthorization: true
        });
    }

    async getPresets() {
        return this.requestAPI.get('api/savedset/', { 
            requiresAuthorization: true
        });
    }

} export default ApiService;
