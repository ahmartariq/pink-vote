import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../Firebase';

const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [currentUserName, setCurrentUserName] = useState('');
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user != null) {
                setCurrentUser(user);
                if (user) {
                    setCurrentUserName(user.displayName);
                }
            } else {
                setCurrentUser({})
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <GlobalContext.Provider value={{ user, setUser, currentUser, setCurrentUser, setCurrentUserName, currentUserName }}>
            {children}
        </GlobalContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(GlobalProvider);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}

export { GlobalContext, GlobalProvider, useAuth };