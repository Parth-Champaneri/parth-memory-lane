import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCyc2GcoZSZ2jpRsfeUSpdfNSHG5f33Gis',
  authDomain: 'memory-lane-ae1f4.firebaseapp.com',
  projectId: 'memory-lane-ae1f4',
  storageBucket: 'memory-lane-ae1f4.appspot.com',
  messagingSenderId: '395122708021',
  appId: '1:395122708021:web:c9c5fc614dfed476f76b7c',
}
const fireapp = initializeApp(firebaseConfig)

const storage = getStorage(fireapp)
export default storage
