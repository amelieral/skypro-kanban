import { authService } from './auth';

const API_BASE_URL = 'https://wedev-api.sky.pro/api/kanban';

class KanbanAPI {
    async request(url, options = {}) {
        const token = authService.getToken();
        
        if (!token) {
            throw new Error('Токен не найден. Требуется авторизация.');
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            ...options.headers
        };

        try {
            const response = await fetch(`${API_BASE_URL}${url}`, {
                ...options,
                headers
            });

            if (response.status === 401) {
                authService.logout();
                throw new Error('Ошибка 401: Не авторизован');
            }

            if (response.status === 404) {
                throw new Error('Ошибка 404: Задача не найдена');
            }

            if (response.status === 400) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Ошибка 400: Неверный формат данных');
            }

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            return response.json();
        } catch (err) {
            if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                throw new Error('Нет соединения с сервером. Проверьте интернет-соединение.');
            }
            throw err;
        }
    }

    async getTasks() {
        return this.request('');
    }

    async createTask(taskData) {
        const data = {
            title: taskData.title || 'Новая задача',
            topic: taskData.topic || 'Research',
            status: taskData.status || 'Без статуса',
            description: taskData.description || '',
            date: taskData.date || new Date().toISOString()
        };

        return this.request('', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateTask(id, taskData) {
        return this.request(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(taskData)
        });
    }

    async deleteTask(id) {
        return this.request(`/${id}`, {
            method: 'DELETE'
        });
    }

    async getTaskById(id) {
        return this.request(`/${id}`);
    }
}

export const kanbanApi = new KanbanAPI();