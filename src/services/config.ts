export const getConfig = (str: string): string => {
  return window.apiUrl
    ? `${window.apiUrl}/${str}`
    : window.location.pathname.replace("auth/", "") + str;
};
