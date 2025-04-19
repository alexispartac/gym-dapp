import React from 'react'
import { Container } from '@mantine/core'
import { ExerciseProp,  } from './Exercises';
import { exercises } from './Exercises';
import RoutineContainer from './new-routine/RoutineContainer';
import { useUser } from "../context/UserContext";
import axios from 'axios'
export interface RoutineExerciseProp extends ExerciseProp {
  inRoutine: boolean;
}
export interface RoutineProp {
  id: string;
  name: string;
  exercises: RoutineExerciseProp[];
}

export const exercisesForRoutine: RoutineExerciseProp[] = exercises.map( (exercise: ExerciseProp) =>  {
  return { ...exercise, inRoutine: false}
})


const Routines = () => {
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
    <Container className='py-[100px]'>
      <h1 className='text-2xl'> My Routines </h1>
      <br />
      <div className='py-[2rem] px-[1rem] rounded-md shadow-md border-[1px] flex-col items-center'>
        <RoutineContainer 
          routinesList={routinesList}
          setRoutinesList={setRoutinesList}
        />   
      </div>
      <br /> <br /> <br /> <br />
    </Container>
  )
}

export default Routines