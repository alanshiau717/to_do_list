import { useMutation, useQuery } from "@apollo/client";
import { render } from "@testing-library/react";
import React from "react";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import userAccess from "../../services/user.access";
import Cookies from "universal-cookie"
import {GoogleLoginDocument} from "../../generated"
interface Props {
  handleSuccessfulSignIn: () => void
}
interface State {

} 


// export default class GoogleSignInButton extends React.Component<Props, State> {
//     constructor(props: Props) {
//         super(props);
//         this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this)
//     }
//     async responseGoogleSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
//         if("profileObj" in response) {
//           await userAccess.googleSignIn(response.getAuthResponse().id_token)
//           console.log("handling successfuly sign in")
//           this.props.handleSuccessfulSignIn()
//         }
//       }
//     responseGoogleFailure(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
//         console.log(response)
//       }  

//     render() {
//         return(
//         <GoogleLogin
//         clientId={process.env.REACT_APP_CLIENT_ID!}
//         buttonText="Login"
//         onSuccess={this.responseGoogleSuccess}
//         onFailure={this.responseGoogleFailure}
//         cookiePolicy={'single_host_origin'}
//       />)
//     }
// }

export default function GoogleSignInButton(props: Props) {
  const [googleSignIn, {data, loading, error}] = useMutation(GoogleLoginDocument)
  if(data){
      const cookies = new Cookies();
      cookies.set('token', data.googleLogin.accessToken, { path: '/' });
      localStorage.setItem("defaultFolder", JSON.stringify(data.googleLogin.defaultFolder))
      localStorage.setItem("inbox", JSON.stringify(data.googleLogin.inbox))
  }

  async function responseGoogleSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    if("profileObj" in response) {
      await googleSignIn({variables: {data: {idToken: response.getAuthResponse().id_token}}})
      console.log("handling successfuly sign in")
      props.handleSuccessfulSignIn()
    }
  }
  function responseGoogleFailure(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    console.log(response)
  }
  return(
    <GoogleLogin
    clientId={process.env.REACT_APP_CLIENT_ID!}
    buttonText="Login"
    onSuccess={responseGoogleSuccess}
    onFailure={responseGoogleFailure}
    cookiePolicy={'single_host_origin'}
  />)
}

