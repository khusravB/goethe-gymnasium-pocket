// create-news.js
import apiClient from './axios-config.js';

document.getElementById('newsForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    const formData = new FormData();
    formData.append('Title', document.getElementById('title').value);
    formData.append('Created_at', document.getElementById('created_at').value);
    formData.append('Description', document.getElementById('description').value);
    formData.append('Image_1', document.getElementById('image1').files[0]);
    formData.append('Image_2', document.getElementById('image2').files[0]);
    formData.append('Image_3', document.getElementById('image3').files[0]);
    formData.append('small_description', document.getElementById('small_description').value);

    try {
        const response = await apiClient.post('api/collections/goethe_news/records', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }, // Указываем тип для файлов
        });

        if (response.status === 200) {
            document.getElementById('responseMessage').textContent = 'News created successfully!';
            console.log('News created:', response.data);

            // Перенаправление на страницу списка новостей
            setTimeout(() => {
                window.location.href = 'news-list.html';
            }, 2000); // Ожидание 2 секунды перед перенаправлением (опционально)
        }
    } catch (error) {
        document.getElementById('responseMessage').textContent = `Error: ${error.response?.data?.message || 'Failed to create news'}`;
        console.error('Creation error:', error);
    }
});
