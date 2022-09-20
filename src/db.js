import { getFirestore } from "firebase/firestore";
import app from "./firebase.js";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";


const db = getFirestore(app);
// const userCollection = collection(db, "users");

// Function to add user to firestore
export function addUser(user) {
    console.log(user);
    setDoc(doc(db, "users", user.id), user)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
}

// Function to get user from firestore
export async function getUserData(uid) {
    const docRef = doc(db, "users", uid);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch { alert('Error in getting user data.') }
}

// Function to update user in firestore
export async function updateUser(user) {
    const docRef = doc(db, "users", user.id);    

    try {
        return updateDoc(docRef, {
            album: user.album,
            albumCompleted: user.albumCompleted,
        });
    } catch { alert('Error in updating user data.') }

}