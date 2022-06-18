
export default class Response {
  public data: any;
  public status: number;
  public statusText: string;
  public headers: any;
  public config: any;
  public request: any;

  constructor(res: any) {
    this.data = res.data;
    this.status = res.status;
    this.statusText = res.statusText;
    this.headers = res.headers;
    this.config = res.config;
    this.request = res.request;
  }

}
