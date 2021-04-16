import axios from 'axios';

export async function fetchFeaturedContent(page: number = 0) {
    try {
        let res = await axios.get('/api/v1/featured-content', {
            params: {
                size: 20,
                page
            }
        });
        return res.data;
    } catch (e) {
    }
}

export async function fetchContentBanners(identities: string[]) {
    try {
        let res = await axios.get(`/api/v1/content-banners`, {
            params: {
                filter: {
                    identities
                },
                sortBy: 'priority',
                size: -1    
            }
        });
        return res.data;
    } catch (e) {
    }
}

export async function fetchCollectionItems(identity: string) {
    try {
        let res = await axios.get(`/api/v1/collections/${identity}/items?size=20&page=0`);
        return res.data;
    } catch (e) {
    }
}
