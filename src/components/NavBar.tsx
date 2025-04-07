import React from 'react'
import { Group, Burger, Avatar } from '@mantine/core'
import { Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const BurgerMenu = ({ opened, toggle }: { opened: true, toggle: () => void }) => {

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
                    <p>Username</p>
                    <p>Logout</p>
                </Group>
            </motion.div>
        </Stack>
    )
}


const NavBar = () => {
    const [opened, { toggle }] = useDisclosure();
    const { balance } = useUser();

    return (
        <div>
            {opened ?
                <BurgerMenu opened={opened} toggle={toggle} />
                :
                null
            }
            <Group className='justify-between py-3 '>
                <Burger opened={opened} size={'md'} lineSize={'2.5'} onClick={toggle} aria-label="Toggle navigation" />
                <Group>
                    <p className='' >{balance} SOL</p>
                    <Avatar radius="xl" />
                </Group>
            </Group>
        </div>
    )
}

export default NavBar