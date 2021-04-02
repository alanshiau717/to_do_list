import http from "../http-common";
import UserLoginType from "../models/user.login";

class UserAccessService {
  signup() {
    return http.post("/account/signup");
  }
  signin(data: UserLoginType) {
    return http.post("/account/signin", data).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(response);
      return response.data;
    });

    //return http.post("/account/signin", data);
  }
  verify() {
    return http.get("/account/verify");
  }
  logout() {
    localStorage.removeItem("user");
    return http.post("account/logout");
  }

  getCurrentUser() {
    const jwt = localStorage.getItem("user");
    if (jwt != null) {
      return JSON.parse(jwt).accessToken;
    }
    return undefined;
  }
}

export default new UserAccessService();
