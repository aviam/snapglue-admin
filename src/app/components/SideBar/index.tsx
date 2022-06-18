import * as React from 'react';
import firebase from 'firebase';
import {Link} from 'react-router-dom';
import './style.scss';
// import { connect } from 'react-redux';

// import { UserModel } from 'app/models';
import User from '../../entities/User';
// import { UserActions } from 'app/actions/user';
// import { bindActionCreators, Dispatch } from 'redux';
// import { RouteComponentProps } from 'react-router';
// import { TodoTextInput } from '../TodoTextInput';
// import { RootState } from 'app/reducers';

// import { omit } from 'app/utils';
export namespace SideBar {

  export interface State {
    open: boolean;
    user: User;
  }
}
export class SideBar extends React.Component<any, SideBar.State> {

  constructor(props: any, context?: any) {
    super(props, context);
    // this.setUser = this.setUser.bind(this);

    this.state = {
      open: false,
      user: new User({}),
    };
  }

  public componentDidMount() {
    const user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
      location.href = '/dashboard';
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        if (window.location.pathname.indexOf('/sign') === -1) {
          location.href = '/sign-in';
        }
      } else {
        this.setState({user: new User(user)})
      }
    });
    setTimeout(() => {$('.sidenav').sidenav()}, 100);
  }
  //
  // private setUser(user: any): void {
  //   this.props.actions.setUser(new User(user));
  // }

  render() {
    // const { classes, theme } = this.props;
    return (
      <div>
      <nav>
        <div className="nav-wrapper">
          <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-low">
            {/*<li><a href="sass.html">Sass</a></li>*/}
            {/*<li><a href="badges.html">Components</a></li>*/}
            {/*<li>*/}
              {/*<img className="profile-image" src=""/>*/}
              {/*<span>{localStorage.getItem('email')}</span>*/}

            {/*</li>*/}
          </ul>
        </div>
      </nav>
        <ul id="slide-out" className="sidenav">
          <li><div className="user-view">
            <div className="background"/>
            <a href="#user"><img className="circle" src="https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg"/></a>
            {this.state.user.displayName && <a href="#name"><span className=" name">{this.state.user.displayName.split('@')[0] || ''}</span></a>}
            <a href="#email"><span className="text-primary email">{this.state.user.email || ''}</span></a>
          </div></li>
          <li className="sidenav-close"><Link to={`/dashboard`}><i className="material-icons">dashboard</i>Dashboard</Link></li>
          <li><div className="divider"/></li>
          <li className="sidenav-close"><Link to={`/services`}><i className="material-icons">cloud</i>Services</Link></li>
          <li className="sidenav-close"><Link to={`/execute`}><i className="material-icons">send</i>Execute</Link></li>
          <li className="sidenav-close"><Link to={`/join`}><i className="material-icons">call_split</i>Join</Link></li>
          {/*<li><a className="waves-effect" href="#!">Third Link With Waves</a></li>*/}
        </ul>
      </div>
    );
  }
}

// export  default withStyles(styles, { withTheme: true })(SideBar);
