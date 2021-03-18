import http from "../http-common";
import { UserLoginType } from "../models/user.login";

class UserAccessService {
  signup() {
    return http.post("/account/signup");
  }
  signin(data: UserLoginType) {
    return http.post("/account/signin", data);
  }
  verify() {
    return http.get("/account/verify");
  }
  logout() {
    return http.post("account/logout");
  }
}

export default new UserAccessService();
