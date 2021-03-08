export function isAuthenticated() {
  if (typeof window == 'undefined') return false;

  if (sessionStorage.getItem('jwt')) {
    const jwtToken:any = sessionStorage.getItem('jwt')
    return true;
    // return JSON.parse(jwtToken);
  }

  else return false;
}