import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const getMeetings = async (uid) => {
    const meetingsRef = collection(db, 'meetings');
    const querySnapshot = await getDocs(meetingsRef);
    const meetings = [];
    querySnapshot.forEach((doc) => {
        if (doc.data().uid === uid)
            meetings.push({ id: doc.id, ...doc.data() });
    });
    return meetings;
};

export const addMeeting = async (uid, meeting) => {
    const meetingRef = collection(db, 'meetings');
    const docRef = await addDoc(meetingRef, { ...meeting, uid });
    return { id: docRef.id, ...meeting };
};

export const updateMeeting = async (id, updatedMeeting) => {
    const meetingRef = doc(db, 'meetings', id);
    await updateDoc(meetingRef, updatedMeeting);
    return { id, ...updatedMeeting };
};

export const deleteMeetingById = async (id) => {
    const meetingRef = doc(db, 'meetings', id);
    await deleteDoc(meetingRef);
};
