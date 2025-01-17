const apiClient = axios.create({
    baseURL: 'https://ehjoi-manaviyat.pockethost.io/', // Базовый URL API
    headers: {
        'Content-Type': 'application/json',
    },
});

// Добавляем токен в заголовок Authorization, если он есть
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
