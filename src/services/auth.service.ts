import axios from 'axios';

export async function login(data: any) {
    try {
        let res = await axios.post('/api/v2/authentication/login', data);
        return res.data;
    } catch (e) {
    }
}
