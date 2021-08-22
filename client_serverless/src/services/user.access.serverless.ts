import { Auth} from "aws-amplify";
import {userHasAuthenticated} from "../redux/reducers/userSessionSlice";
import {store} from "../redux/store"
class UserAccessService {
    async createResources(User: any){
        if(!("default_folder" in User.attributes) && !("inbox" in User.attributes)){
            console.log('creating folder and inbox')
        }
        
    }
    async signup(data: {
        email: string, password:string, firstName: string, lastName: string
    }){
        await Auth.signUp({
            username: data.email,
            password: data.password,
            attributes: {
                "custom:firstName": data.firstName,
                "custom:lastName": data.lastName,
                "custom:inbox": "",
                "custom:default_folder": ""
            },
        })
        
        
    }

    async signIn(email: string, password: string){
        const User = await Auth.signIn(email, password)
        store.dispatch(userHasAuthenticated(true))
        await this.createResources(User)
    }
    async confirmAndLogIn(email: string, confirmationCode: string, password: string){
        await Auth.confirmSignUp(email, confirmationCode)
        const User = await this.signIn(email, password)
        store.dispatch(userHasAuthenticated(true))
        await this.createResources(User)      

    }

    async currentSession(){
        await Auth.currentSession()
        const User = await Auth.currentUserInfo()
        store.dispatch(userHasAuthenticated(true))
        await this.createResources(User)    


    }
}

export default new UserAccessService()