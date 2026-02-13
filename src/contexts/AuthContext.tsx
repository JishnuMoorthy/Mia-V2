const login = useCallback(async (email: string, password: string) => {
  setIsLoading(true);
  setError(null);

  try {
    // Try real backend first
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const userData = { ...data.user, token: data.access_token };
      setUser(userData);
      localStorage.setItem('authToken', data.access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('mockMode', 'false');
      setIsMockMode(false);
    } else if (response.status === 401) {
      setError('Invalid email or password');
    } else {
      throw new Error('Backend error');
    }
  } catch (err) {
    console.log('Backend unreachable, using mock mode');
    try {
      const { mockLogin } = await import('@/lib/mock-data');
      const mockUser = await mockLogin(email, password);
      const userData = { ...mockUser.user, token: mockUser.access_token };
      setUser(userData);
      localStorage.setItem('authToken', mockUser.access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('mockMode', 'true');
      setIsMockMode(true);
    } catch (mockErr) {
      setError(mockErr instanceof Error ? mockErr.message : 'Login failed');
    }
  } finally {
    setIsLoading(false);
  }
}, []);
