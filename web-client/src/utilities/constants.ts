export const Route = {
  Root: '/',
  About: '/about'
} as const;

export const LocalStorageKeys = {
  Token: {
    AccessToken: 'access_token',
    ExpiresIn: 'expires_in'
  },
  Theme: 'theme'
} as const;
