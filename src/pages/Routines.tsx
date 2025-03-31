import React from 'react'

import { Container, Button, Stack, Group } from '@mantine/core'
import { IconSearch, IconLibrary } from '@tabler/icons-react';
import { ExerciseProp,  } from './Exercises';

interface RoutineProp {
  name: string;
  exercises: ExerciseProp[];
}

const routinesList = [
  {
    name: 'Push Day',
    exercises: [
      {
        name: 'Bench Press',
        muscleGroup: 'Chest',
        id: '1'
      },
      {
        name: 'Squat',
        muscleGroup: 'Legs',
        id: '2'
      },
      {
        name: 'Deadlift',
        muscleGroup: 'Back',
        id: '3'
      }
    ],
  },
  {
    name: 'Pull Day',
    exercises: [
      {
        name: 'Overhead Press',
        muscleGroup: 'Shoulders',
        id: '4'
      },
      {
        name: 'Bicep Curl',
        muscleGroup: 'Arms',
        id: '5'
      },
      {
        name: 'Tricep Extension',
        muscleGroup: 'Arms',
        id: '6'
      }
    ],
  },
  {
    name: 'Leg Day',
    exercises: [
      {
        name: 'Squat',
        muscleGroup: 'Legs',
        id: '7'
      },
      {
        name: 'Lunges',
        muscleGroup: 'Legs',
        id: '8'
      },
      {
        name: 'Leg Press',
        muscleGroup: 'Legs',
        id: '9'
      }
    ],
  },
  {
    name: 'Cardio',
    exercises: [
      {
        name: 'Running',
        muscleGroup: 'Cardio',
        id: '10'
      },
      {
        name: 'Cycling',
        muscleGroup: 'Cardio',
        id: '11'
      },
      {
        name: 'Swimming',
        muscleGroup: 'Cardio',
        id: '12'
      }
    ],
  }
]

const RoutineContiner = () => {
  return(
    <Stack>
      <h1 className='text-xl font-medium'> Routines </h1>
      <Group className='flex justify-between'>
        <Button variant='outline' color='blue' className='w-[50%] '>
          <IconLibrary className='mr-2' />
          New Routine
        </Button>
        <Button variant='outline' color='blue' className='w-[42%]'>
          <IconSearch className='p-1' />
          Explore
        </Button>
      </Group>
    </Stack>
  );
}

const Routine = ({ routine } : { routine : RoutineProp }) => {
  return(
    <Container className="w-full h-[120px] bg-gray-100 py-[10px] px-[1rem] rounded-md shadow-md border-[1px] flex-col items-center">
      <Group>
        <Stack gap={0.5} className='w-[45%]'>
          <h1 className='font-medium'>{routine.name}</h1>
          <Group>
              <Stack gap={0} pl={5} className='w-[110px]'>
                <h1 className='truncate'> {routine.exercises[0].name} </h1>
                <h1 className='truncate'> {routine.exercises[1].name} </h1>
                <h1 className='truncate'> {routine.exercises[2].name} </h1>
              </Stack>
          </Group>
        </Stack>
        <Stack gap={1} className='w-[45%]'>
            <Button variant='outline' color='blue' className='w-full my-[5px]'>
              {/* o componenta care arata exercitiile salvate in rutina, ofera posibilitatea sa le si schimbe */}
              VIEW 
            </Button>
            <Button variant='outline' color='blue' className='bg-blue-500 text-white w-full my-[5px]'>
              {/* o componenta new workout care preia exercitiile salvate in rutina */}
              START
            </Button>
        </Stack>
      </Group>
    </Container>
  );
}

export const RoutinesElements = () => {
  return(
    <Stack>
        {/* maxim 6 routines */}
        {routinesList.map((routine, index) => (
          <Routine key={index} routine={routine} />
        ))}
    </Stack>
  );
}

const Routines = () => {
  return (
    <Container>
      <br />
      <h1 className='text-2xl'> My Routines </h1>
      <br />
      <div className='py-[2rem] px-[1rem] rounded-md shadow-md border-[1px] flex-col items-center'>
        <RoutineContiner />   
      </div>
      <br />
      <RoutinesElements />
      <br /> <br /> <br /> <br />
    </Container>
  )
}

export default Routines