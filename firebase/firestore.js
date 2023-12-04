import { generateSlug } from "../utils/formatString";
import { firestore } from "./firebase";
import { v4 as uuidv4 } from "uuid";

function addUser(email, uid, fullname, IDnum, isAdmin) {
  firestore.collection("users").doc(uid).set({
    admin: isAdmin,
    IDnum: IDnum,
    email: email,
    fullname: fullname,
    uid: uid,
  });
}
function getAllUsers() {
  firestore
    .collection("users")
    .get()
    .then(function (snapshot) {
      snapshot.forEach(function (cSnapshot) {
        return cSnapshot;
      });
    });
}
function getUserDetails(uid) {
  firestore
    .collection("users")
    .doc(uid)
    .get()
    .then((snapshot) => {
      console.log(snapshot.data());
    });
}

async function getAllJobsSlugs() {
  let slugs = [];
  firestore
    .collection("jobs")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        let uid = doc.data().uid;
        let slug = generateSlug(uid);
        slugs.push(slug);
      });
      return slugs.map((slug) => {
        slug;
      });
    });
}
async function getJobBySlug(slug) {
  // let slugs=[]
  console.log(slug);
  firestore
    .collection("jobs")
    .doc(slug)
    .get()
    .then((snapshot) => {
      console.log("result: ", snapshot.data());
      return snapshot.data();
      // return snapshot.docs.map((doc) => {
      //   doc.data();
      // });
    });
}

export { addUser, getAllUsers, getUserDetails, getAllJobsSlugs, getJobBySlug };
