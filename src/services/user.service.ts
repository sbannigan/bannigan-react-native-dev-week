import axios from 'axios';

export async function getCurrentUser() {
    try {
        let res = await axios.get('/api/v1/users/current');
        return res.data;
    } catch (e) {
    }
}

export async function getConfiguration() {
    try {
        let res = await axios.get('/api/v2/configuration');
        return res.data;
    } catch (e) {
    }
}
