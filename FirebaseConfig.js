// FirebaseConfig.mjs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, serverTimestamp, collection, addDoc, getDocs, query, where, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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
export async function createUser(db, aboutMeData, quizData, colorData, namesData) {
    
    console.log('User data:', {
        userName: namesData,
        aboutMe: aboutMeData,
        quiz: quizData,
        color: colorData,
        createdAt: serverTimestamp()
    });    
    
    try {
        const docRef = await addDoc(collection(db, "users"), {
          userName: namesData,
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

export async function updateUserData(userId, newFields) {
    try {
        // Get a reference to the specific user's document
        const userDocRef = doc(db, "users", userId);
        
        // Update the user's document with new fields
        await updateDoc(userDocRef, newFields);

        console.log("User data updated successfully.");
    } catch (e) {
        console.error("Error updating user data: ", e);
    }
}

// Function to get the document ID by userName
export async function getIdByUsername(userName) {
    try {
        // Reference the "users" collection
        const usersCollectionRef = collection(db, "users");

        // Create a query that filters by userName
        const q = query(usersCollectionRef, where("userName", "==", userName));

        // Get the query snapshot
        const querySnapshot = await getDocs(q);

        // If a matching document exists
        if (!querySnapshot.empty) {
            // Access the first document from the query snapshot
            const doc = querySnapshot.docs[0]; // In case of multiple results, choose the first one

            // Return the document ID
            console.log("User ID: ", doc.id);
            return doc.id; // Document ID
        } else {
            console.log("No user found with that username.");
            return null; // No user found
        }
    } catch (e) {
        console.error("Error getting user by username: ", e);
    }
}

export{db}