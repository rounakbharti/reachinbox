  
import axios from 'axios';

export const sendSlackNotification = async (message: string) => {
    await axios.post('https://slack.com/api/chat.postMessage', { text: message });
};

export const triggerWebhook = async (url: string, data: any) => {
    await axios.post(url, data);
};
