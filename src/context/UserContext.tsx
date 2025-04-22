import { createContext, useState, useContext } from 'react';
import { ReactNode } from 'react';
import { UserNFT } from '../pages/Wallet';
interface User {
    userInfo : {
        userId: string;
        username: string;
        publicKey: string;
        password: string;
    }
    isAuthenticated: boolean;
}

interface UserContextType {
    balance: number;
    user: User;
    NFT: UserNFT[];
    setUser: React.Dispatch<React.SetStateAction<User>>;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
    setNFT: React.Dispatch<React.SetStateAction<UserNFT[]>>;
}

const UserContext = createContext<UserContextType>({
    user: {
        userInfo : {
            userId: '',
            username: '',
            publicKey: '',
            password: '',
        },
        isAuthenticated: false,
    },
    balance: 0,
    NFT: [],
    setNFT: () => {},
    setUser: () => {},
    setBalance: () => {},
    
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({
        userInfo : {
            userId: '',
            username: '',
            publicKey: '',
            password: '',
        },
        isAuthenticated: false,
    });
    const [balance, setBalance] = useState(0);
    const [NFT, setNFT] = useState<UserNFT[]>([]);

    return (
        <UserContext.Provider value={{ user, setUser, balance, setBalance, NFT, setNFT }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = () => {
    return useContext(UserContext);
};