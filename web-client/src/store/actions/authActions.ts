import { API_URL } from '@/utilities/env';
import { post } from '@/utilities/fetch/genericFetch';
import { useAuthStore } from '@/store/stores/authStore';
import { useUIStore } from '@/store/stores/uiStore';
import { loginApi } from '@/utilities/fetch/loginFetch';

export const postRegister = async (
  username: string,
  password: string
): Promise<{ message: string }> => {
  const authStore = useAuthStore();
  const uiStore = useUIStore();

  uiStore.setIsLoading(true);

  try {
    const response = await post<{ message: string }>(
      `${API_URL}/authentication/register`,
      { username, password }
    );

    authStore.setRegistrationSuccess(true);
    return response;
  } catch (e) {
    authStore.setRegistrationSuccess(false);
    uiStore.setError('Registration failed');

    const errMsg = e instanceof Error ? e.message : 'Registration failed';

    return { message: errMsg };
  } finally {
    uiStore.setIsLoading(false);
  }
};

export type LoginResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token?: string;
};
export const postLogin = async (
  username: string,
  password: string
): Promise<'Login successful' | 'Login failed'> => {
  const authStore = useAuthStore();
  const uiStore = useUIStore();

  uiStore.setIsLoading(true);

  try {
    const res = await loginApi(username, password);
    const { access_token, expires_in } = res;

    authStore.setToken(access_token, expires_in);
    uiStore.clearError();

    return 'Login successful';
  } catch (error) {
    uiStore.setError('Login failed');
    return 'Login failed';
  } finally {
    uiStore.setIsLoading(false);
  }
};

export const postLogout = async (): Promise<'Logged out'> => {
  const { logOut } = useAuthStore();
  const { setIsLoading } = useUIStore();

  setIsLoading(true);

  try {
    await post(`${API_URL}/authentication/logout`);
  } catch (e) {
    console.error(e);
  }

  logOut();
  setIsLoading(false);
  return 'Logged out';
};
