import React from 'react'
import { Container, Button } from '@mantine/core'


const Routines = () => {
  return (
    <Container px={'xl'}>
      <br />
      <h1 className='text-2xl'> My Routines </h1>
      <br />
      <div className='py-[2rem] px-[1rem] rounded-md shadow-md border-1 border-b-stone-600 '>
        <div className='flex flex-col items-center'>
          <Button fullWidth className='bg-blue-700' variant="filled" color="rgba(82, 113, 255, 0.96)" radius="xl" my={2}> New </Button>
          <Button fullWidth className='bg-gray-500' variant="filled" color="rgba(173, 173, 173, 0.96)" radius="md" my={2}> Routines </Button>
        </div>
      </div>
    </Container>
  )
}

export default Routines