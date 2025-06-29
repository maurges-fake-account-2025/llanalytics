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
        let errorMessage = 'Login failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // If JSON parsing fails, try to get plain text
          try {
            const textData = await response.text();
            if (textData) {
              errorMessage = textData;
            }
          } catch (textError) {
            // Use default message if both JSON and text parsing fail
            errorMessage = `Authentication failed (${response.status})`;
          }
        }
        
        return {
          success: false,
          message: errorMessage
        };
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
            name: 'Bolt User',
            email: credentials.login,
            plan: 'Starter Plan'
          }
        };

        // Store token and user data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(loginResponse.user));

        return loginResponse;
      } else {
        return {
          success: false,
          message: data.message || 'Invalid response format'
        };
      }
    } catch (error) {
      console.error('Login request failed:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred'
      };
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