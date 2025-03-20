import { createContext, useContext, useState } from 'react';

interface UserData {
    accessToken: string;
    email: string;
    name: string;

}

interface AuthContextType {
    user: UserData;
    login: (userData: UserData) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user') || 'null');
    });

    const login = (userData: UserData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
