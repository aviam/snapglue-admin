import * as React from 'react';
// import * as AjaxService from '../../services/AjaxService';
import firebase from 'firebase';
require('./style.scss');

export class SignIn extends React.Component<any, any> {

  constructor(props: any, context?: any) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.signIn = this.signIn.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }



  private handleChange(e: any): void {
    if (e.target.name === 'email') {
      this.setState({email: e.target.value})
    } else {
      this.setState({password: e.target.value})
    }
  }
  private signIn(): void {
    const {email, password} = this.state;
    // AjaxService.post('http://localhost:4700/v1/auth/login', {email, password}).then((res: any) => {
    //   localStorage.setItem('accessToken', res.data.token.accessToken);
    //   localStorage.setItem('expiresIn', res.data.token.expiresIn);
    //   localStorage.setItem('refreshToken', res.data.token.refreshToken);
    //   localStorage.setItem('tokenType', res.data.token.tokenType);
    //   localStorage.setItem('email', res.data.user.email);
    //   localStorage.setItem('createdAt', res.data.user.createdAt);
    //   localStorage.setItem('id', res.data.user.id);
    //   localStorage.setItem('role', res.data.user.role);
    //   window.location.href= '/dashboard';
    // });
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      M.toast({html: error.message});
    }).then((res) => {
      const user = firebase.auth().currentUser;
      console.log(user);
      if (user) {
        location.href = '/dashboard';
      }
    });
  }

  render() {
    const {email, password} = this.state;
    return (
      <div className="row sign-in">
        <div className="row">
          <div className="col s11 m8 l9  offset-m1  offset-l1"><h5>Sing In</h5></div>
        </div>


        <div className="row">
          <div className="col s12 offset-m3 m6 offset-l3 l6 box z-depth-3">
            <form>
              <div className="input-field col s12">
                <input  id="email" type="text" className="validate" name="email" placeholder="Email" onChange={this.handleChange} value={email}/>
              </div>
              <div className="input-field col s12">
                <input  id="password" type="password" className="validate" name="password" placeholder="Password" onChange={this.handleChange} value={password}/>
              </div>
              <div className="col s12">
                <a className="col s12 waves-effect waves-light btn" onClick={this.signIn}>Save</a>
              </div>

            </form>
          </div>
        </div>

      </div>
    );
  }
}
