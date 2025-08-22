const AUTH_API_URL = 'https://wedev-api.sky.pro/api/user';

class AuthAPI {
    async login(login, password) {
        try {
            const response = await fetch(`${AUTH_API_URL}/login`, {
                method: 'POST',
                body: JSON.stringify({
                    login: login,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Неверный логин или пароль');
            }

            return response.json();
        } catch (error) {
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                throw new Error('Сервер авторизации недоступен. Проверьте интернет-соединение.');
            }
            throw error;
        }
    }

    async register(login, name, password) {
        try {
            const response = await fetch(AUTH_API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    login: login,
                    name: name,
                    password: password
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Пользователь с таким логином уже существует');
            }

            return response.json();
        } catch (error) {
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                throw new Error('Сервер авторизации недоступен. Проверьте интернет-соединение.');
            }
            throw error;
        }
    }

    async getUsers() {
        try {
            const response = await fetch(AUTH_API_URL, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Ошибка загрузки пользователей');
            }

            return response.json();
        } catch (error) {
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                throw new Error('Сервер недоступен. Проверьте интернет-соединение.');
            }
            throw error;
        }
    }
}

export const authApi = new AuthAPI();