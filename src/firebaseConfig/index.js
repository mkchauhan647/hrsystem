import { db, storage, auth } from './firebaseConfig'
import { getDocs, collection, query, where, getDoc, doc, setDoc, updateDoc, deleteDoc,addDoc } from 'firebase/firestore'


// Insert Data to candidates collection in firestore

export const insertCandidate = async (data) => {
    try {
        // const docRef = await setDoc(doc(db, "candidates", data.id), data);
        const docRef = await addDoc(collection(db, 'candidates'), data);
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