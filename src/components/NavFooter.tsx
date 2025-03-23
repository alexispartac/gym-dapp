import React from 'react'
import { Group, Stack } from '@mantine/core'
import { IconHome, IconUser, IconBell, IconPlus, IconCategory } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const NavFooter = () => {
  return (
    <Group className='flex h-[4.4rem] w-screen justify-between px-5 items-center fixed bottom-0 left-0 bg-white border-t-2 z-60'>
        <Link to={'/'}>
            <Stack gap={0} align='center' w={"30px"}>
                <IconHome size={30} />
                <p> Home </p>
            </Stack>
        </Link>
                
        <Link to={'/routines'}>
            <Stack gap={0} align='center' w={"30px"}>
                <IconCategory size={30} />
                <p className='text-[13px]'>Routines</p>
            </Stack>
        </Link>

        <Link to={'/workout/new'}>
            <Stack gap={0} align='center' w={"30px"}>
                <IconPlus size={30} />
                <p className='text-[13px]'>Workout</p>
            </Stack>
        </Link>

        <Link to={'/notification'}>
            <Stack gap={0} align='center' w={"30px"}>
                <IconBell size={30} />
                <p className='text-[13px]'>Notification</p>
            </Stack>
        </Link>
        
        <Link to={'/profile'}>
            <Stack gap={0} align='center' w={"30px"}>
                <IconUser size={30} />
                <p className='text-[13px]'>Profile</p>
            </Stack>
        </Link>
    </Group>
  )
}

export default NavFooter