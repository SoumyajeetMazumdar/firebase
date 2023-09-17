import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  //   getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

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

//query based filtered collection ref
const q = query(collectionRef, where("author", "!=", "JK Rowling"));

//get collection data
// getDocs(collectionRef)
//   .then((snapshot) => {
//     //   console.log(snapshot.docs);
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ id: doc.id, ...doc.data() });
//     });
//     console.log(books);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

/* get REAL TIME COLLECTION DATA : getDocs changed into onSnapshot 
- callback function runs each time there is a change in the collection-parameter */
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ id: doc.id, ...doc.data() });
  });
  console.log(books);
});

/* for ADDITION OF BOOKS */
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(collectionRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    console.log("added");
    addBookForm.reset();
  });
});

/* for DELETION OF BOOKS */
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const documentRef = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(documentRef).then(() => {
    console.log("deleted");
    deleteBookForm.reset();
  });
});
