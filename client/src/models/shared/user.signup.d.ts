//type declaration for when user is signing up

export default interface UserSignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isDeleted: boolean;
  activated: boolean;
}
