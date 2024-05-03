import { API_URL } from '@/utilities/env';
import { post } from '@/utilities/fetch/genericFetch';
import { useAuthStore } from '@/store/stores/authStore';
import { useUIStore } from '@/store/stores/uiStore';

export const postRegister = async (
  username: string,
  password: string
): Promise<{ message: string } | null> => {
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
    return null;
  } finally {
    uiStore.setIsLoading(false);
  }
};
