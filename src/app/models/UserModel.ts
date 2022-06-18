export interface UserModel {
  email?: string;
  displayName?: string;
  idToken?: string;
}


export namespace UserModel {
  export enum Filter {
    SHOW_ALL = 'all',
    SHOW_ACTIVE = 'active',
    SHOW_COMPLETED = 'completed'
  }
}
