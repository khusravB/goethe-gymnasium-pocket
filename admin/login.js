// login.js
import apiClient from './axios-config.js';

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    const identity = document.getElementById('identity').value;
    const password = document.getElementById('password').value;

    try {
        const response = await apiClient.post('api/collections/users/auth-with-password', { identity, password });

        if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem('authToken', token); // Сохраняем токен
            document.getElementById('responseMessage').textContent = 'Login successful!';
            window.location.href = 'create-news.html'; // Перенаправление
        }
    } catch (error) {
        document.getElementById('responseMessage').textContent = `Error: ${error.response?.data?.message || 'Login failed'}`;
        console.error('Login error:', error);
    }
});
