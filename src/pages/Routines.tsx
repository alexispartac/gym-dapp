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
export const routinesList = [
  {
    name: 'Push Day',
    exercises: [
      {
        name: 'Bench Press',
        muscleGroup: 'Chest',
        id: '1',
        inRoutine: false
      },
      {
        name: 'Squat',
        muscleGroup: 'Legs',
        id: '2',
        inRoutine: false
      },
      {
        name: 'Deadlift',
        muscleGroup: 'Back',
        id: '3',
        inRoutine: false
      }
    ],
  },
  {
    name: 'Pull Day',
    exercises: [
      {
        name: 'Overhead Press',
        muscleGroup: 'Shoulders',
        id: '4',
        inRoutine: false
      },
      {
        name: 'Bicep Curl',
        muscleGroup: 'Arms',
        id: '5',
        inRoutine: false
      },
      {
        name: 'Tricep Extension',
        muscleGroup: 'Arms',
        id: '6',
        inRoutine: false
      }
    ],
  },
  {
    name: 'Leg Day',
    exercises: [
      {
        name: 'Lunges',
        muscleGroup: 'Legs',
        id: '7',
        inRoutine: false
      },
      {
        name: 'Plank',
        muscleGroup: 'Core',
        id: '8',
        inRoutine: false
      },
      {
        name: 'Pull-Up',
        muscleGroup: 'Back',
        id: '9',
        inRoutine: false
      }
    ],
  }
]

const Routines = () => {
  return (
    <Container>
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