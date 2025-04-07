import { createContext, useState, useContext } from 'react';
import { ReactNode } from 'react';

interface User {
    id: number | null;
    name: string;
    publicKey: string;
    isAuthenticated: boolean;
}

interface UserContextType {
    balance: number;
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
}

const UserContext = createContext<UserContextType>({
    user: {
        id: null,
        name: '',
        publicKey: '',
        isAuthenticated: false,
    },
    balance: 0,
    setUser: () => {},
    setBalance: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({
        id: null,
        name: '',
        publicKey: '',
        isAuthenticated: false,
    });
    const [balance, setBalance] = useState(0);

    return (
        <UserContext.Provider value={{ user, setUser, balance, setBalance }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = () => {
    return useContext(UserContext);
};