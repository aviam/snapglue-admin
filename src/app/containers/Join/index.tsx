import * as React from 'react';
import * as _ from 'lodash';
import FireBase from '../../services/Firebase';
import Service from '../../entities/Service';
require('./style.scss');
// import * as axios from 'axios';


export class Join extends React.Component<any, any> {

  constructor(props: any, context?: any) {
    super(props, context);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.save = this.save.bind(this);
    this.state = {
      services: [],
      name: '',
      editIndex: -1,
      joinApi: {},
      userApi: [],
    };
  }

  public componentDidMount() {
    FireBase.get('services').then((res: any) => {
      this.setState({services: res.data.map((service) => new Service(service))});
      setTimeout(() => {$('select').formSelect()}, 100);
    });
    FireBase.get('join_apis').then((res: any) => {
      this.setState({userApi: res.data});

    });
    $('.modal.edit').modal({endingTop: '10%'});


  }

  private handleCheck(service: Service, path: string): void {
    debugger;
    const {joinApi} = this.state;
    if (joinApi[service.name]) {
      if (_.indexOf(joinApi[service.name].apis, path) !== -1 ) {
        joinApi[service.name].apis = _.pull(joinApi[service.name].apis, path);
      } else {
        joinApi[service.name].apis.push(path);
      }
    } else {
      joinApi[service.name] = {apis: []};
    }
    this.setState({ joinApi });
    console.log(joinApi);
  }

  private handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.name === 'join-name') {
      this.setState({name: e.target.value});
    }
  }

  private openEdit(index: number): void {
    const {editIndex} = this.state;
    if (editIndex === index) {
      this.setState({editIndex: -1});
    } else {
      this.setState({editIndex: index});
    }
  }

  private save(): void {
    const {joinApi, name} = this.state;

    FireBase.post('join_apis', {apis: joinApi , name}).then((res) => {
      debugger;
    });
  }

  private renderEditModal(): JSX.Element {
    const {services, editIndex, joinApi} = this.state;
    debugger;
    return (
      <div id="edit-modal" className="modal edit modal-fixed-footer">
        <div className="modal-content">
          <h4>Create Service</h4>
          <p>Select the join api's you want to merge</p>

          <div className="input-field col s6">
            <input  id="service_name" type="text" className="validate"  name="join-name" onChange={this.handleChange}/>
            <label htmlFor="service_name">Join Name</label>
          </div>

          <table className="table-status-sheet bordered col s10 offset-s1 rules-table up-table">
            <thead>
            <tr className="table-header row">
              <th className="id col s1">#</th>
              <th className="name col s4">Name</th>
              <th className="description col 5">Description</th>
              <th className="description col 2">Action</th>

            </tr>
            </thead>
            <tbody className="up-scroll">
            {services.map((service, index) => {
              const paths: string[] = service.swagger.paths ? _.keys(service.swagger.paths) : [];
              return (
              <tr key={`action-${service.name}`} className="row">
                <td>
                  <table>
                    <tbody className={`inside-edit ${editIndex !== index ? 'close' : 'open'}`}>
                    <tr className="top-row" onClick={this.openEdit.bind(this, index)}>
                      <td className="id col s1"><span>{index + 1}</span></td>
                      <td className="name col s4">{service.name}</td>
                      <td className="description col s5">{service.description}</td>
                      <td className="edit col s2" onClick={this.openEdit.bind(this, index)}>
                        {editIndex !== index && <i className="material-icons">arrow_drop_down</i>}
                        {editIndex === index && <i className="material-icons">arrow_drop_up</i>}
                      </td>
                    </tr>
                    <tr className={`api-row ${editIndex !== index ? 'close' : 'open'} row margin-bottom-0`}>
                      <td className="col s12">
                        <div className="row">
                          {paths && paths.map((p) => {
                            return (
                              <div key={`${service.name}-${p}`} onClick={this.handleCheck.bind(this, service, p)}>
                                <input type="checkbox" className="filled-in"
                                       checked={joinApi[service.name] && _.indexOf(joinApi[service.name].apis, p) !== -1}
                                       />
                                <span>{p}</span>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              );
            })}
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          <a className="modal-close waves-effect waves-green btn-flat" onClick={this.save}>SAVE</a>
        </div>
      </div>
    );
  }

  render() {
    const {userApi} = this.state;
    return (
      <div className="row join">
        <div className="row margin-top-20">
          <div className="col s12 m8 l9"><h5 >Create New Api</h5></div>
          <div className="col s12 m4 l3 right-align">
            <a className="waves-effect waves-light btn modal-trigger" href="#edit-modal">Create New Join api</a>
          </div>
        </div>

        {this.renderEditModal()}

        <table className="table-status-sheet bordered col s10 offset-s1 rules-table up-table">
          <thead>
          <tr className="table-header">
            <th className="id">#</th>
            <th className="name">Name</th>
            <th className="actions">Actions</th>

          </tr>
          </thead>
          <tbody className="up-scroll">
          {userApi.map((api, index) => {
            return (
              <tr key={`action-${api.name}`}>
                <td className="id"><span>{index + 1}</span></td>
                <td className="name">{api.name}</td>
                {/*<td className="description">{service.description}</td>*/}
                <td className="edit" onClick={this.openEdit.bind(this, index)}><i className="material-icons">edit</i></td>
              </tr>
            );
          })}
          </tbody>
        </table>

      </div>
    );
  }
}
