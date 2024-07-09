'use client'
import { db, storage, auth } from './firebaseConfig'
import { getDocs, collection, query, where, getDoc, doc, setDoc, updateDoc, deleteDoc,addDoc } from 'firebase/firestore'
import { GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';
import React from 'react';
// Insert Data to candidates collection in firestore

export const insertData = async (collectionname,data) => {
    try {
        // const docRef = await setDoc(doc(db, "candidates", data.id), data);
        const docRef = await addDoc(collection(db, collectionname), data);
        console.log("Document written with ID: ", docRef.id);
        return docRef
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Get Data from candidates collection in firestore

export const getCandidates = async () => {

    const q = query(collection(db, "candidates"));
    const querySnapshot = await getDocs(q);
    let data = []
    querySnapshot.forEach((doc) => {
        data.push(doc.data())
    });
    return data
}

// Get data of a single candidate from candidates collection in firestore

export const getCandidate = async (id) => {
    const docRef = doc(db, "candidates", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log("No such document!");
    }
}

// Update data of a single candidate in candidates collection in firestore

export const updateCandidate = async (id, data) => {
    const docRef = doc(db, "candidates", id);
    await updateDoc(docRef, data);
}

const signWithPop = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result
}


// Create context for firebase

export const FirebaseContext = React.createContext(null);

// Create a provider for Firebase context

export const FirebaseProvider = ({ children }) => {
    return (
        <FirebaseContext.Provider value={{auth,signWithPop }}>
            {children}
        </FirebaseContext.Provider>
        )
}

