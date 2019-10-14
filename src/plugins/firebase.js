import firebase from 'firebase'

// Configure and initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDfuKtBCO3IKdaIrFNC2MosWpXxlkSiGYQ',
  authDomain: 'diet-quasar.firebaseapp.com',
  databaseURL: 'https://diet-quasar.firebaseio.com',
  projectId: 'diet-quasar',
  storageBucket: 'diet-quasar.appspot.com',
  messagingSenderId: '118655359102',
  appId: '1:118655359102:web:4da4a5b1c49c265dfb202f'
})

firebase.firestore().enablePersistence()
  .catch(err => {
    if (err.code === 'failed-precondition') {
      console.error(err)
    } else if (err.code === 'unimplemented') {
      console.error(err)
    }
  })
export const db = firebase.firestore()
