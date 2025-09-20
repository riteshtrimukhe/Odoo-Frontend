export class AuthService {
  constructor() {
    this.token = localStorage.getItem('auth_token');
    this.user = JSON.parse(localStorage.getItem('auth_user') || 'null');
  }

  async login(credentials) {
    // Mock login - in production this would call your API
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      const mockUser = {
        id: 1,
        username: 'admin',
        name: 'Administrator',
        role: 'admin'
      };
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      this.token = mockToken;
      this.user = mockUser;
      
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      
      return { user: mockUser, token: mockToken };
    }
    throw new Error('Invalid credentials');
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  isAuthenticated() {
    return !!this.token;
  }

  getUser() {
    return this.user;
  }

  getToken() {
    return this.token;
  }
}

export const authService = new AuthService();