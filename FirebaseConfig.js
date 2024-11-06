// FirebaseConfig.mjs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzVUFQM-GT_Pxk1m8KHGyE2lfX4Fkihek",
  authDomain: "notiapp-ff8b0.firebaseapp.com",
  projectId: "notiapp-ff8b0",
  storageBucket: "notiapp-ff8b0.firebasestorage.app",
  messagingSenderId: "259790595328",
  appId: "1:259790595328:web:ab4430cd5c9fb9de217fe5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
export async function createUser(db, aboutMeData, quizData, colorData, userNameData, otherNameData) {
    
    console.log('User data:', {
        userName: userNameData,
        otherName: otherNameData,
        aboutMe: aboutMeData,
        quiz: quizData,
        color: colorData
    });    
    
    try {
        const docRef = await addDoc(collection(db, "users"), {
          userName: userNameData + "-" + otherNameData,
          aboutMe: aboutMeData,
          quiz: quizData,
          color: colorData,
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id; // Ensure it returns the document ID
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;  // Return null or handle error gracefully
    }
}

// Get a list of cities from your database
export async function getUser(db, userNameData) {
    try {
        const usersRef = collection(db, 'users');
        
        // Query to find the specific user
        const q = query(usersRef, where("userName", "==", userNameData));
        const querySnapshot = await getDocs(q);

        // Return the first matching user or null if none found
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        } else {
            return null;
        }
    } catch (e) {
        console.error("Error retrieving document: ", e);
        return null;
    }
}

export{db}