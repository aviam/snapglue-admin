
export default class Service {
  public id: string;
  public name: string;
  public description: string;
  public parentId: string;
  public swagger: any;

  constructor(service: any) {
    this.id = service.id;
    this.description = service.description;
    this.name = service.name;
    this.parentId = service.parentId;
    this.swagger = JSON.parse(service.swagger);
  }

}
