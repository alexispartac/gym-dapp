import React from 'react'
import { Container, Stack } from '@mantine/core'
import { RoutinesElements } from './Routines';
import { ExerciseProp } from './Exercises';
import NewWorkout from './new-workout/NewWorkout';
import { SetProp } from './new-workout/Exercise';

export interface WorkoutExercisesProp extends ExerciseProp {
  inWorkout: boolean;
  sets: SetProp[];
}

const Workout = () => {

  return (
    <Container className='flex flex-col gap-5 h-screen'>
      <Stack>
        <h1 className='text-xl font-medium'> Quick Start </h1>
      </Stack>
      <NewWorkout />
      <br />
      <RoutinesElements />
      <br /> <br /> <br /> <br />
    </Container>
  )
}

export default Workout