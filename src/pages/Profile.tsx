import React from 'react'
import { Container, Group, Stack, Avatar, Button, Badge } from '@mantine/core'
import { IconPremiumRights } from '@tabler/icons-react';
import { useUser } from '../context/UserContext';

const ProfileData = ( { user } : { user : any }) => {
  return (
    <Container className='border-[1px] px-4 py-3 shadow-md rounded-md my-5 bg-white' >
    <Stack>
      <Group>
        <Avatar size={'xl'} />
        <Stack gap={2}> 
          <h1 className='text-xl'> { user.username } </h1>
          <p> { user.username } </p>
        </Stack>
      </Group>
      <Button variant='outline' color='black' className='w-full'> Edit Profile </Button>
    </Stack>
  </Container>
  );
}

const CalendarData = () => {
  return (
    <Container className=' border-[1px] px-4 py-3 shadow-md rounded-md my-5 bg-white'>
      <Group>
        <h1 className='text-xl'> Calendar </h1>
        <IconPremiumRights color='yellow'/>
      </Group>
      <Badge className='flex justify-center font-light'> Premium </Badge>
    </Container>
  );
}

const Chart = () => {
  return (
    <Container className=' border-[1px] px-4 py-3 shadow-md rounded-md my-5 bg-white'>
      <Group>
        <h1 className='text-xl'> Chart </h1>
        <IconPremiumRights color='yellow'/>
      </Group>
      <Badge className='flex justify-center font-light'> Premium </Badge>
    </Container>
  );  
}

const Workouts = () => {
  return (
    <Container className=' border-[1px] px-4 py-3 shadow-md rounded-md my-5 bg-white'>
      <h1 className='text-xl'> Workouts </h1>
    </Container>
  );
}

const Profile = () => {
  const { user } = useUser();

  return (
    <Container className='py-[100px]'>
      <ProfileData user={user.userInfo} />
      <CalendarData />
      <Chart />
      <Workouts />
      <br />
      <br />
    </Container>
  )
}

export default Profile