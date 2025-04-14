import React from 'react'
import { Container, Stack } from '@mantine/core'
import { ExerciseProp } from './Exercises';
import NewWorkout from './new-workout/NewWorkout';
import { SetProp } from './new-workout/Exercise';
import RoutineContainer from './new-routine/RoutineContainer';

export interface WorkoutExercisesProp extends ExerciseProp {
  inWorkout: boolean;
  sets: SetProp[];
}
 
export interface ExercisePropDB {
  id: string;
  name: string;
  muscle_group: string;
  sets: SetProp[];
}

export interface WorkoutPostProp {
  id: string;
  user_id: string;
  username: string;
  exercises: ExercisePropDB[];
  date: string;
  duration: number;
  volume: number;
  sets: number;
  rewards: number;
}

const Workout = () => {

  return (
    <Container className='flex flex-col gap-5 h-screen py-[100px]'>
      <Stack>
        <h1 className='text-2xl'> Quick Start </h1>
      </Stack>
      <NewWorkout />
      <h1 className='my-[5px] text-2xl'> Start a routine</h1>
      <Container m={0} className='py-[1rem] px-[1rem] rounded-md shadow-md border-[1px]'>
        <RoutineContainer />
      </Container>
      <br /> <br /> <br /> <br />
    </Container>
  )
}

export default Workout