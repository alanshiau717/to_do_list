import http from "../http-common";
import UserLoginType from "../models/shared/user.login";
import UserSignup from "../models/client/user.signup"
import {UserApiFactory, UserLoginResponse} from "../apiClient/api"
import Cookies from "universal-cookie"
import authConfig from "../utils/axios.auth.config"


export type UserDetails = Pick<UserLoginResponse, "defaultFolder"| "inbox">

class UserAccessService {
  userApiFactory = UserApiFactory(authConfig,process.env.REACT_APP_EXPRESS_SERVER_BASE_URL,undefined)
  
  signup(data: UserSignup) {
    return http.post("/account/signup", data)
  }
  signin(data: UserLoginType) {
    return http.post("/account/signin", data).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  async nativeUserSignIn(email: string, password: string) {
    this.userApiFactory.nativeUserLogin({email: email, password: password}).then((response)=>{
      const cookies = new Cookies();
      cookies.set('token', response.data.accessToken, { path: '/' });
      localStorage.setItem("defaultFolder", JSON.stringify(response.data.defaultFolder))
      localStorage.setItem("inbox", JSON.stringify(response.data.inbox))
    })
  }
  async googleSignIn(idToken: string){
    try{

    const loginResponse = await this.userApiFactory.googleLogin({idToken: idToken})
    const cookies = new Cookies();
    cookies.set('token', loginResponse.data.accessToken, { path: '/' });
    localStorage.setItem("defaultFolder", JSON.stringify(loginResponse.data.defaultFolder))
    localStorage.setItem("inbox", JSON.stringify(loginResponse.data.inbox))
    console.log("Successfully signed in google user")
    return true}
    catch{
      throw new Error("Login Error")
    }
    // this.userApiFactory.googleLogin({idToken: idToken}).then((response)=> {
    //   const cookies = new Cookies();
    //   cookies.set('token', response.data.accessToken, { path: '/' });
    //   localStorage.setItem("defaultFolder", JSON.stringify(response.data.defaultFolder))
    //   localStorage.setItem("inbox", JSON.stringify(response.data.inbox))
    //   console.log("Successfully signed in google user")
    //   return true
    // }).catch(
    //   (err) => {
    //     // TODO: Handle Login Error
    //     console.log(err)
    //     throw new Error("Login Error")
    //   }
    // )
  }
  
  async isCurrentSessionValid(): Promise<boolean>{
    // TODO: Check whether this function needs to be async or not.
  
    try{
      const response = await this.userApiFactory.validateCurrentSession()
      return response.data
    }
    catch{
      return false 
    }
  }

  verify() {
    return http.get("/account/verify");
  }
  logout() {
    localStorage.removeItem("user");
    return http.post("account/logout");
  }

  getCurrentUser(): UserDetails {
    const defaultFolder = localStorage.getItem("defaultFolder");
    const inbox = localStorage.getItem("inbox")
    if (defaultFolder != null && inbox != null) {
      return {
        defaultFolder: JSON.parse(defaultFolder),
        inbox: JSON.parse(inbox)
      }
    } else {
      throw new Error("JWT not found");
    }
  }

}

export default new UserAccessService();
