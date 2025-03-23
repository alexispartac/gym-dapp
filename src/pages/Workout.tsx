import React from 'react'
import { Container, Button } from '@mantine/core'

const Workout = () => {
  return (
    <Container className='flex flex-col gap-5 h-screen'>
        <h1 className='text-2xl font-bold'>Workout</h1>
        <Button fullWidth className='bg-blue-700 shadow-xl' variant="filled" color="rgba(82, 113, 255, 0.96)" radius="xl" my={2}> Start a workout </Button>
    </Container>
  )
}

export default Workout