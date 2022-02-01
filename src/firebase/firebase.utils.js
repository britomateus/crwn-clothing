import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: 'AIzaSyAuJ5W3q6AzAE6dp29KOQCee-MCi2puQos',
  authDomain: 'crwn-db-f634c.firebaseapp.com',
  databaseURL: 'https://crwn-db-f634c-default-rtdb.firebaseio.com',
  projectId: 'crwn-db-f634c',
  storageBucket: 'crwn-db-f634c.appspot.com',
  messagingSenderId: '657445452726',
  appId: '1:657445452726:web:a30dcf1e21240eceeb1f17',
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
