import * as React from 'react';

export class Loader extends React.Component<any> {
  constructor(props: any, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <div className="preloader-wrapper small active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"/>
          </div><div className="gap-patch">
          <div className="circle"/>
        </div><div className="circle-clipper right">
          <div className="circle"/>
        </div>
        </div>
      </div>
    );
  }
}
