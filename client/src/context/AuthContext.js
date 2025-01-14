import React , {createContext , useState , useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export default ({ children }) => {
     //Providing a global state to the children
    const [user , setUser] = useState(null);
    const [isAuthenticated , setIsAuthenticated] = useState(false);
    const [isLoaded , setIsLoaded] = useState(false);
    
    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    } , []);

    return (
        <div>
            {isLoaded ? <AuthContext.Provider value={{user, setUser , isAuthenticated , setIsAuthenticated}}>
                { children } 
            </AuthContext.Provider> : <h2>Loading...</h2> }
        </div>
    )
}
