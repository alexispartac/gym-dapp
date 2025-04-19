import React from 'react'
import { Container, Stack } from '@mantine/core'
import { ExerciseProp } from './Exercises';
import NewWorkout from './new-workout/NewWorkout';
import { SetProp } from './new-workout/Exercise';
import RoutineContainer from './new-routine/RoutineContainer';
import { RoutineProp } from './Routines';
import { useUser } from '../context/UserContext';
import axios from 'axios';

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
  const [routinesList, setRoutinesList] = React.useState<RoutineProp[]>([]);
  const { user } = useUser();
  
  const URL = `http://127.0.0.1:8080/routine/get/${user.userInfo.userId}`;
  React.useEffect(() => {
    const fetchRoutines = async () => {
      if (!user || !user.userInfo || !user.userInfo.userId) {
        return;
      }
      try {
        const response = await axios.get<RoutineProp[]>(URL, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setRoutinesList(response.data.reverse());
      } catch (error) {
        console.error("Failed to fetch routines:", error);
        alert("Failed to fetch routines. Please try again.");
      }
    };

    fetchRoutines();
  }, [URL, user]);

  return (
    <Container className='flex flex-col gap-5 h-screen py-[100px]'>
      <Stack>
        <h1 className='text-2xl'> Quick Start </h1>
      </Stack>
      <NewWorkout />
      <h1 className='my-[5px] text-2xl'> Start a routine</h1>
      <Container m={0} className='py-[1rem] px-[1rem] rounded-md shadow-md border-[1px]'>
      <RoutineContainer 
          routinesList={routinesList}
          setRoutinesList={setRoutinesList}
        />  
      </Container>
      <br /> <br /> <br /> <br />
    </Container>
  )
}

export default Workout