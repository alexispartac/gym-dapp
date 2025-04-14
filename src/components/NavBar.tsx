import React, { useState, useEffect } from 'react';
import { Group, Burger, Avatar } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useCookies } from 'react-cookie';

const BurgerMenu = ({ opened, toggle, user, setUser }: { opened: true, toggle: () => void, user: any, setUser: React.Dispatch<React.SetStateAction<any>> }) => {
    const [, , removeCookie] = useCookies(['login']);

    return (
        <Stack className='fixed top-0 left-0 h-screen w-60 bg-white z-50 p-5 rounded-lg shadow-xl shadow-zinc-400'>
            <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                exit={{ x: -100 }}
                transition={{ duration: 0.5 }}
            >
                <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
                <Stack className='mt-10 text-xl'>
                    <Link to={'/'} onClick={toggle}> <p> Home </p> </Link>
                    <Link to={'/feed'} onClick={toggle}> <p> Feed </p> </Link>
                    <Link to={'/routines'} onClick={toggle}> <p> Routines </p> </Link>
                    <Link to={'/exercises'} onClick={toggle}> <p> Exercises </p> </Link>
                    <Link to={'/wallet'} onClick={toggle}> <p> Wallet </p> </Link>
                </Stack>
                <Group className='mt-[330px]'>
                    <Avatar radius="xl" />
                    <p> {user.username} </p>
                    <IconLogout onClick={() => {
                        setUser({ isAuthenticated: false, userInfo: { userId: '', username: '', publicKey: '', password: '' } });
                        removeCookie('login', { path: '/' });
                    }} />
                </Group>
            </motion.div>
        </Stack>
    );
};

const NavBar = () => {
    const [opened, { toggle }] = useDisclosure();
    const { balance, user, setUser } = useUser();
    const [isVisible, setIsVisible] = useState(true); 
    const [lastScrollY, setLastScrollY] = useState(0); 

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
               setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} fixed top-0 left-0 w-full bg-transparent z-50`}>
            {
                opened ?
                    <BurgerMenu user={user.userInfo} setUser={setUser} opened={opened} toggle={toggle} />
                    :
                    null
            }
            <Group className='justify-between py-3 px-4'>
                <Burger opened={opened} size={'md'} lineSize={'2.5'} onClick={toggle} aria-label="Toggle navigation" />
                <Group>
                    <p className='' >{balance} SOL</p>
                    <Avatar radius="xl" />
                </Group>
            </Group>
        </div>
    );
};

export default NavBar;