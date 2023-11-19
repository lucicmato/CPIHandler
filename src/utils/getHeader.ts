//Prepare header for http API calls
export const getHeader = (idToken: string): object => {
  return {
    Authorization: `Bearer ${idToken}`,
    Accept: '*/*',
  };
};
