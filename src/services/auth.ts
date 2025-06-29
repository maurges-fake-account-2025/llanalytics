export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    plan: string;
  };
  message?: string;
}

export class AuthAPI {
  private baseUrl = '/api';

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('Sending login request to:', `${this.baseUrl}/auth/login`);
      console.log('Credentials:', credentials);

      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.text();
          if (errorData) {
            errorMessage = errorData;
          }
        } catch (e) {
          // Ignore parsing errors
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Login response:', data);
      
      // Handle the simple token response format
      if (data.token) {
        const loginResponse: LoginResponse = {
          success: true,
          token: data.token,
          user: {
            id: '1',
            name: 'Sarah Mitchell',
            email: credentials.login,
            plan: 'Starter Plan'
          }
        };

        // Store token and user data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(loginResponse.user));

        return loginResponse;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login request failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        await fetch(`${this.baseUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}

export const authAPI = new AuthAPI();