import axios from 'axios';

// const notesUrl = 'api/v1/notes';

export default class AjaxService {
  public static get(url) {
    return axios.get(`${url}`, {
      headers: {
        Accept: 'application/json',
      },
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      if (err.response != null) {
        throw Error(err.response.data.error.message);
      }
      throw Error(err);
    });
  }

  // public static fetch(payload: IActionFetchNoteRequested['payload']) {
  //   return axios.get(`${notesUrl}/${payload.id}`, {
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   }).then((res) => {
  //     return res.data;
  //   }).catch((err) => {
  //     if (err.response != null) {
  //       throw Error(err.response.data.error.message);
  //     }
  //     throw Error(err);
  //   });
  // }
  //
  public static post(url:string ,payload: any) {
    return axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then((res) => {
      return res.data;
    }).catch((err) => {
      if (err.response != null) {
        throw Error(err.response.data.error.message);
      }
      throw Error(err);
    });
  }
  //
  // public static put(payload: any) {
  //   return axios.put(`${notesUrl}/${payload.id}`, payload, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     },
  //   }).then((res) => {
  //     return res.data;
  //   }).catch((err) => {
  //     if (err.response != null) {
  //       throw Error(err.response.data.error.message);
  //     }
  //     throw Error(err);
  //   });
  // }
  //
  // public static remove(payload: IActionRemoveNoteRequested['payload']) {
  //   return axios.delete(`${notesUrl}/${payload.id}`, {
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   }).then((res) => {
  //     return res.data;
  //   }).catch((err) => {
  //     if (err.response != null) {
  //       throw Error(err.response.data.error.message);
  //     }
  //     throw Error(err);
  //   });
  // }
}
