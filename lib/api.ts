const API_BASE_URL = 'http://127.0.0.1:8000/accounts'; // Update this with your Django backend URL

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

interface AuthResponse {
    id: string;
    email: string;
    username: string;
    login_type: string;
    isProfileComplete: boolean;
}

interface ProfileData {
    firstname: string;
    lastname: string;
    bio: string;
    country: string;
    native_language: string;
    gender: string;
    date_of_birth: string | null;
    phone_number: string;
    daily_goal: number;
    profile_picture: string;
    requirement: string;
}

// Cache for weekly activity data
let weeklyActivityCache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const logsService = {
    async trackPageVisit(pageUrl: string, visitDate: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/logs/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page_url: pageUrl,
                visit_date: visitDate,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to track page visit');
        }
    },

    async getWeeklyActivity(): Promise<any> {
        // Check cache first
        const now = Date.now();
        if (weeklyActivityCache && now - weeklyActivityCache.timestamp < CACHE_DURATION) {
            return weeklyActivityCache.data;
        }

        const response = await fetch(`${API_BASE_URL}/logs?view=week`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch weekly activity');
        }

        const data = await response.json();
        
        // Update cache
        weeklyActivityCache = {
            data,
            timestamp: now,
        };

        return data;
    },

    async getHeatmapData(): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/logs?view=heatmap`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch heatmap data');
        }

        return response.json();
    },
};

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include', // This is important for handling cookies
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
            credentials: 'include', // This is important for handling cookies
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }

        const data = await response.json();
        return data;
    },

    async verifyEmail(email: string, otp: string): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/verifyemail/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
            credentials: 'include', // This is important for handling cookies
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Email verification failed');
        }

        const data = await response.json();
        return data;
    },

    async resendOTP(id: string) {
        const response = await fetch(`${API_BASE_URL}/request-verifyemail/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
            credentials: 'include', // This is important for handling cookies
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to resend OTP');
        }

        const data = await response.json();
        return data;
    },

    async logout() {
        const response = await fetch(`${API_BASE_URL}/logout/`, {
            method: 'POST',
            credentials: 'include', // This is important for handling cookies
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Logout failed');
        }

        const data = await response.json();
        return data;
    },

    async updateProfile(profileData: ProfileData): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/update/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update profile');
        }
    },
};

export const userService = {
    async getUserProfile() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/accounts/update`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        return response.json();
    },
}; 