import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const register = async (email, password, additionalData) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: `${additionalData.firstName} ${additionalData.lastName}`,
        });

        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            firstName: additionalData.firstName,
            lastName: additionalData.lastName,
            city: additionalData.city,
            phone: additionalData.phone,
            uid: user.uid,
        });

        return user;
    } catch (error) {
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    try {
        signOut(auth);
    } catch (error) {
        throw error;
    }
};
