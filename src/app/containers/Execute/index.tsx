import * as React from 'react';
import FireBase from '../../services/Firebase';
import * as SwaggerUI from 'swagger-ui';
import Service from '../../entities/Service';

require('./style.scss');
import * as _ from 'lodash';
// import * as axios from 'axios';


export class Execute extends React.Component<any, any> {

  constructor(props: any, context?: any) {
    super(props, context);
    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.state = {
      services: [],
      selectedService: {},
      selectedServiceName: '',
    };
  }

  public componentDidMount() {
    // MainService.get('http://localhost:4700/v1/services').then((res: any[]) => {
    //   this.setState({services: res.data});
    // });
    FireBase.get('services').then((res: any) => {
      this.setState({services: res.data});
      setTimeout(() => {$('select').formSelect()}, 100);
    });

  }

  private handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const selectedService: Service = this.state.services.find((service: Service) => {
      return service.name === e.target.value
    });
    SwaggerUI({
      dom_id: '#swagger-ui',
      deepLinking: true,
      spec: JSON.parse(selectedService.swagger),
      layout: 'BaseLayout',
    });
    const swagger = JSON.parse(selectedService.swagger);
    const paths = _.keys(swagger.paths);
    this.setState({selectedServiceName: e.target.value, selectedService, swagger, paths});
  }

  // private exec(path: string): void {
  //   const {/*selectedService, */swagger} = this.state;
  //   axios.get({
  //     // method: 'get',
  //     url: `https://us-central1-snapglue-d35d3.cloudfunctions.net/addMessage?base=${swagger.host}${swagger.basePath}&path=${path.substr(1
  //     )}`,
  //   }).then((response: any) => {
  //     console.log(response);
  //   }).catch((error: any) => {
  //     console.log(error);
  //     throw error;
  //   });
  //
  // }

  render() {
    // const {selectedServiceName} = this.state;
    return (
      <div className="row">
        <div className="row">
          <div className="col s12 m8 l9"><h5 >Execute</h5></div>
        </div>


        <div className="row">
          <div className="input-field col s12 m4 l3">
            <select onChange={this.handleSelectChange} defaultValue={""}>
              <option value="" disabled selected>Choose your option</option>
              {this.state.services.map((service: Service) => {
                return (<option key={service.id} value={service.name}>{service.name}</option>);
              })}
            </select>
            <label>Select Service</label>
          </div>
        </div>
        <div id="swagger-ui">

        </div>

      </div>
    );
  }
}
