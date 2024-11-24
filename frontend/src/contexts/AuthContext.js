import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // check for is the user authenticated
    const checkAuth = async () => {
        try{
            const response = await axios.get('/api/auth/check', {withCredentials: true});
            setUser(response.data.user);
        }
        catch(error){
            console.error('Authentication check failed: ', error);
            setUser(null);
        }
        finally{
            setLoading(false);
        }
    };

    const logout = async () => {
        await axios.get('/api/auth/logout', { withCredentials: true });
        setUser(null);
    };
    

    useEffect(() => {
        const checkAuthStatus = async () => {
            await checkAuth();
        };
        checkAuthStatus();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);

