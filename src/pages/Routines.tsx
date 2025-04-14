import React from 'react'
import { Container } from '@mantine/core'
import { ExerciseProp,  } from './Exercises';
import { exercises } from './Exercises';
import RoutineContainer from './new-routine/RoutineContainer';
export interface RoutineExerciseProp extends ExerciseProp {
  inRoutine: boolean;
}
export interface RoutineProp {
  name: string;
  exercises: RoutineExerciseProp[];
}

export const exercisesForRoutine: RoutineExerciseProp[] = exercises.map( (exercise: ExerciseProp) =>  {
  return { ...exercise, inRoutine: false}
})

// rutinele din baza de date
export const routinesList : { name: string; exercises: RoutineExerciseProp[] }[] = [];

const Routines = () => {
  return (
    <Container className='py-[100px]'>
      <h1 className='text-2xl'> My Routines </h1>
      <br />
      <div className='py-[2rem] px-[1rem] rounded-md shadow-md border-[1px] flex-col items-center'>
        <RoutineContainer />   
      </div>
      <br /> <br /> <br /> <br />
    </Container>
  )
}

export default Routines