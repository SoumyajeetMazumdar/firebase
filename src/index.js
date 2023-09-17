import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrLXr2A1aoPtfF0TUTWs1ktKBXCMqJ6YI",
  authDomain: "fir-demo-add37.firebaseapp.com",
  projectId: "fir-demo-add37",
  storageBucket: "fir-demo-add37.appspot.com",
  messagingSenderId: "850679455813",
  appId: "1:850679455813:web:9021b81b1de1cf754c832c",
};

// init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection referenes
const collectionRef = collection(db, "books");

//get collection data
getDocs(collectionRef)
  .then((snapshot) => {
    //   console.log(snapshot.docs);
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });
