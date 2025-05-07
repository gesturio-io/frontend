const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Update this with your Django backend URL

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

export const authService = {
    async login(credentials: LoginCredentials) {
        const response = await fetch(`${API_BASE_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        const data = await response.json();
        return data;
    },

    async register(userData: RegisterData) {
        const response = await fetch(`${API_BASE_URL}/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.json();
            // Try to extract a specific error message
            let errorMsg = 'Registration failed';
            if (error) {
                if (typeof error === 'string') {
                    errorMsg = error;
                } else if (error.email && Array.isArray(error.email)) {
                    errorMsg = error.email[0];
                } else if (error.username && Array.isArray(error.username)) {
                    errorMsg = error.username[0];
                } else if (error.password && Array.isArray(error.password)) {
                    errorMsg = error.password[0];
                } else if (error.message) {
                    errorMsg = error.message;
                }
            }
            throw new Error(errorMsg);
        }

        const data = await response.json();
        return data;
    },
}; 