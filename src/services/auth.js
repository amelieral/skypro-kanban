import { authApi } from './authApi';

class AuthService {
    async login(login, password) {
        try {
            const response = await authApi.login(login, password);
            
            const userInfo = {
                token: response.user.token,
                login: response.user.login,
                name: response.user.name,
                id: response.user.id,
                loggedIn: true
            };

            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            return response;
            
        } catch (error) {
            console.error('Ошибка входа:', error);
            throw error;
        }
    }

    async register(login, name, password) {
        try {
            const response = await authApi.register(login, name, password);
            
            return this.login(login, password);
            
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('userInfo');
    }

    isAuthenticated() {
        const userInfo = localStorage.getItem('userInfo');
        return !!userInfo;
    }

    getToken() {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const userData = JSON.parse(userInfo);
            return userData.token;
        }
        return null;
    }

    getUserInfo() {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null;
    }
}

export const authService = new AuthService();