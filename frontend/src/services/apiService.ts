import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchEmails = async (query: string) => {
    return await axios.get(`${API_BASE_URL}/search?query=${query}`);
};
