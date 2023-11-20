import { auth } from '../firebase';

/*user.getIdToken
  Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.
  @remarks
   Returns the current token if it has not expired or if it will not expire in the next five minutes. Otherwise, this will refresh the token and return a new one.
*/
export const getIdToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          unsubscribe(); // Unsubscribe once the token is retrieved
          resolve(idToken);
        } catch (error) {
          console.error('Error getting token:', error);
          unsubscribe(); // Unsubscribe in case of an error
          reject(error);
        }
      } else {
        unsubscribe(); // Unsubscribe if no user is found
        resolve('');
        //TODO: Navigate to login page
      }
    });
  });
};
