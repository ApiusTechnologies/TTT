import RequestAPI from './RequestAPI';

export class ApiService {
    constructor() {
        this.requestAPI = new RequestAPI();
    }

    async getNews(queryParams) {
        return this.requestAPI.get('api/news/', { queryParams });
    }

    async getNextNews(nextNewsUrl) {
        return this.requestAPI.get(nextNewsUrl);
    }


    async getTags(queryParams) {
        return this.requestAPI.get('api/tag/', { queryParams });
    }

    async getAuthenticatedUserProfile() {
        return this.requestAPI.get('api/userprofile/self/', {
            requiresAuthorization: true
        });
    }

    async patchAuthenticatedUserProfile(presets, readNews, customPresets) {
        return this.requestAPI.patch('api/userprofile/self/', {
            body: { presets, read_news: readNews, custom_presets: customPresets },
            requiresAuthorization: true
        });
    }

    async postAuthenticatedCustomPresets(deleteId) {
        return this.requestAPI.post('api/userprofile/self/', {
            body: {delete_id: deleteId},
            requiresAuthorization: true
        });
    }

    async getPresets() {
        return this.requestAPI.get('api/presets/', {});
    }
}
export default ApiService;
