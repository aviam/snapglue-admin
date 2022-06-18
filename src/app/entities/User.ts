
export default class User {
  public email: string;
  public displayName: string;
  public idToken: string;

  constructor(user: any) {
    this.email = user.email;
    this.displayName = user.displayName;
    this.idToken = user.qa;
  }

}
