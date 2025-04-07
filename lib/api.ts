const API_BASE_URL = 'http://localhost:8000/accounts'; // Update this with your Django backend URL

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    // confirm_password: string;   // ADD CHECK IF PASSWORDS MATCH
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
            throw new Error(error.message || 'Registration failed');
        }

        const data = await response.json();
        return data;
    },

    async verifyEmail(email: string, otp: string) {
        const response = await fetch(`${API_BASE_URL}/verifyemail/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Email verification failed');
        }

        const data = await response.json();
        return data;
    },

    async resendOTP(email: string) {
        const response = await fetch(`${API_BASE_URL}/request-verifyemail/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to resend OTP');
        }

        const data = await response.json();
        return data;
    },
}; 