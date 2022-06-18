import * as React from 'react';

export class Dashboard extends React.Component<any, any> {

  constructor(props: any, context?: any) {
    super(props, context);
  }

  public componentDidMount() {
    //  $('select').formSelect();
  }

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col s12 m8 l9"><h5>Dashboard</h5></div>
        </div>
      </div>
    );
  }
}
