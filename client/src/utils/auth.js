import decode from "jwt-decode";

class AuthService {
  //retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if the user is logged on
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  //check to see if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // retrives token from locationStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  //set token to localStorage and reload to home
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // clear token from LS and force logout with reload
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
