import React from "react";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import userAccess from "../../services/user.access";
interface Props {
  handleSuccessfulSignIn: () => void
}
interface State {

} 


export default class GoogleSignInButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this)
    }
    async responseGoogleSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
        if("profileObj" in response) {
          await userAccess.googleSignIn(response.getAuthResponse().id_token)
          console.log("handling successfuly sign in")
          this.props.handleSuccessfulSignIn()
        }
      }
    responseGoogleFailure(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
        console.log(response)
      }  

    render() {
        return(
        <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID!}
        buttonText="Login"
        onSuccess={this.responseGoogleSuccess}
        onFailure={this.responseGoogleFailure}
        cookiePolicy={'single_host_origin'}
      />)
    }
}