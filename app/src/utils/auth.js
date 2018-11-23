
export const getSessionToken = () => localStorage.getItem('TOKEN');

export const setSessionToken = token => localStorage.setItem('TOKEN', token);

export const removeSessionToken = () => localStorage.removeItem('TOKEN');
