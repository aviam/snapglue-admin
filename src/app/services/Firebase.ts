import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDVFg4NdbzIefheVOflKQCgI_KuLRN0V3c",
  authDomain: "snapglue-d35d3.firebaseapp.com",
  databaseURL: "https://snapglue-d35d3.firebaseio.com",
  projectId: "snapglue-d35d3",
  storageBucket: "snapglue-d35d3.appspot.com",
  messagingSenderId: "995886858464"
});

const db = app.firestore();



export default class FireBase {
  public static get(collection: string) {
    return db.collection(collection).get().then((querySnapshot: any) => {
      const res: any[] = [];
      querySnapshot.forEach((doc: any) => {
        const obj = doc.data();
        obj.id = doc.id;
        res.push(obj);
      });
      return {data: res};

    });
  }

  public static post(collection: string, data: any) {
    return db.collection(collection).add(data).then((docRef) => {
      return docRef.id;
    }).catch((error) =>  {
      debugger;
      console.error('Error adding document: ', error);
    });
  }

  public static remove(collection: string, doc: string) {
    return db.collection(collection).doc(doc).delete().then(() => {
       return console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  public static put(collection: string, doc: string, data: any) {
    return db.collection(collection).doc(doc).update(data).then(() => {
      return console.log("Document successfully updated!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
}


