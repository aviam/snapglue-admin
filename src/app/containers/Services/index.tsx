import * as React from 'react';
// import AjaxService from '../../services/AjaxService';
import FireBase from '../../services/Firebase';
import Service from '../../entities/Service';
import { Loader } from 'app/components';
import * as _ from 'lodash';

require('./style.scss');

export class Services extends React.Component<any, any> {

  constructor(props: any, context?: any) {
    super(props, context);
    this.onChangeInputFiles = this.onChangeInputFiles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.openDelete = this.openDelete.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.swaggerEdit = this.swaggerEdit.bind(this);
    this.createService = this.createService.bind(this);
    this.state = {
      selectedService: {},
      services: [],
      swagger: '',
      name: '',
      description: '',
      saveAble: false,
      loadingFile: false,
    };
  }

  public componentDidMount() {
    FireBase.get('services').then((res: any) => {
      this.setState({services: res.data});
    });
    // AjaxService.get('http://localhost:4700/v1/services').then((res: any) => {
    //   this.setState({services: res.data});
    // });
    $('.modal.edit').modal({endingTop: '10%'});
    $('.modal.delete').modal({endingTop: '10%'});
  }

  public onChangeInputFiles(e: any): void {
    this.setState({file: e.target.files[0], fileName: e.target.files[0].name, loadingFile: true});
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.setState({swagger: e.target.result, loadingFile: false, saveAble: true,});
    };
    if (e.target.files[0]) {
      reader.readAsText(e.target.files[0], "UTF-8");
    }
  }

  private handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.name === 'name') {
      this.setState({name: e.target.value})
    } else {
      this.setState({description: e.target.value})
    }
    this.setState({daveAble: true});
  }

  private save() {
    const {name, description, services, swagger} = this.state;
    FireBase.post('services', {name, description , swagger}).then((res: any) => {
      services.push(new Service({name, description , swagger, id: res}));
      this.setState({ services });
    });
    // AjaxService.post('http://localhost:4700/v1/services', data).then((res: any) => {
    //   this.setState({services: this.state.services.push(res.data)});
    // });
  }

  private update() {
    const {name, description, swagger, selectedService, services} = this.state;
    FireBase.put('services', selectedService.id, {name, description, swagger}).then((res: any) => {
      services.map((service) => {
        if (service.id === selectedService.id) {
          service.name = name;
          service.description = description;
          service.swagger = swagger;
        }
      });
      this.setState({services});
      console.log('updated');
    });
    // AjaxService.post('http://localhost:4700/v1/services', data).then((res: any) => {
    //   this.setState({services: this.state.services.push(res.data)});
    // });
  }

  private remove(): void {
    FireBase.remove('services', this.state.deleteId).then((res: any) => {
      this.setState({services: this.state.services.filter((s) => s.id !== this.state.deleteId)});
    });
    // AjaxService.patch(`http://localhost:4700/v1/services/${this.state.deleteId}`).then((res: any) => {
    //   console.log(res);
    // });
  }

  private openDelete(deleteId: string):void {
    this.setState({deleteId});
  }

  private openEdit(service: Service):void {
    this.setState({name: service.name , description: service.description, swagger: service.swagger, selectedService: service});
  }

  private createService(): void {
    this.setState({name: '' , description: '', swagger: '', selectedService: {}});
  }

  private swaggerEdit(e: any): void {
    console.log(e.target.value);
    this.setState({swagger: e.target.value, saveAble: true});
  }

  private renderDeleteModal(): JSX.Element {
    return (
      <div id="delete-modal" className="modal delete modal-fixed-footer">
        <div className="modal-content">
          <h4>Delete</h4>
          <p>Are you sure you want to delete this service</p>
        </div>
        <div className="modal-footer">
          <a className="modal-close waves-effect waves-green btn-flat" onClick={this.remove}>Delete</a>
          <a className="modal-close waves-effect waves-green btn-flat" >Cancel</a>
        </div>
      </div>
    );
  }

  private renderEditModal(): JSX.Element {
    const {name, description, saveAble, loadingFile, swagger, selectedService} = this.state;
    const jsonSwagger = swagger ? JSON.stringify(JSON.parse(swagger), undefined, 2) : '';
    return (
      <div id="edit-modal" className="modal edit modal-fixed-footer">
        <div className="modal-content">
          <h4>{`${_.isEmpty(selectedService) ? 'Create' : 'Update' } Service`}</h4>
          {/*<p>A bunch of text</p>*/}
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input  id="service_name" type="text" className="validate"  name="name" onChange={this.handleChange} value={name} placeholder="Service Name"/>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input id="desc" type="text" className="validate" name="description" onChange={this.handleChange} value={description} placeholder="Description"/>
              </div>
            </div>
            <div className="row">
              <div className="file-field input-field">
                <div className="btn">
                  <span>Swagger File</span>
                  <input type="file" id="file-input" name="file-input" onChange={this.onChangeInputFiles} />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text"/>
                </div>
              </div>
            </div>
            {/*<a className="waves-effect waves-light btn" onClick={this.toggleSwagger}>Toggle Swagger</a>*/}

            {swagger && <textarea className="swagger-textarea" value={jsonSwagger}   onChange={this.swaggerEdit}/>}

            {loadingFile && <Loader />}
          </form>
        </div>

        <div className="modal-footer">
          {_.isEmpty(selectedService) && <a className={`modal-close waves-effect waves-green btn-flat ${saveAble ? '' : 'disabled'}`} onClick={this.save}>SAVE</a>}
          {!_.isEmpty(selectedService) && <a className={`modal-close waves-effect waves-green btn-flat ${saveAble ? '' : 'disabled'}`} onClick={this.update}>UPDATE</a>}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        {this.renderEditModal()}
        {this.renderDeleteModal()}
        <div className="row"/>
        <div className="row">
          <div className="col s12 m8 l9"><h6 >SERVICES</h6></div>
          <div className="col s12 m4 l3 right-align">
            <a className="waves-effect waves-light btn modal-trigger" href="#edit-modal" onClick={this.createService}>Create New Service</a>
          </div>
        </div>

        {this.state.services.map((service: Service) => {
          return (
            <div className="col s12 m4 l3" key={service.id}>
              <div className="card">
                <div className="card-content">
                  <span className="card-title bold">{service.name}</span>
                  <p>{service.description}</p>
                </div>
                <div className="card-action">
                  <a className="halfway-fab waves-effect waves-light modal-trigger" href="#delete-modal" onClick={this.openDelete.bind(this, service.id)}><i className="material-icons">delete</i></a>
                  <a className="halfway-fab waves-effect waves-light modal-trigger" href="#edit-modal" onClick={this.openEdit.bind(this, service)}><i className="material-icons">edit</i></a>
                </div>
              </div>
            </div>
          );
        })}

        </div>
    );
  }
}
