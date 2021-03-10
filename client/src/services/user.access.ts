import http from "../http-common";
import { UserLoginType } from "../types/user.access";

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
