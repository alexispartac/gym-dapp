import React from "react";
import { Button, Container, Input, Modal, MultiSelect } from "@mantine/core";
import Exercise from "./Exercise";
import { exercisesForRoutine, RoutineExerciseProp, RoutineProp } from "../Routines";
 import ListOfExercises from "./ListOfExercises";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useUser } from "../../context/UserContext";
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'


const NewRoutine = ( 
  { exercises, handleClose, routinesList, setRoutinesList } : 
  { exercises : RoutineExerciseProp[], handleClose: () => void, routinesList : RoutineProp[], setRoutinesList: React.Dispatch<React.SetStateAction<RoutineProp[]>> } ) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [routineExercises, setRoutineExercises] = React.useState<RoutineExerciseProp[]>([]);
  const [name, setName] = React.useState<string>('');
  const [selectedExercises, setSelectedExercises] = React.useState<string[]>(['All Muscles']);  // categoriile de exercitii
  const [loading, setLoading] = React.useState<boolean>(false);
  const { user } = useUser();
  const handleAddExercise = ( exercise : RoutineExerciseProp ) => { 
    setRoutineExercises([...routineExercises, { ...exercise, inRoutine: true}]); 
    exercises.map((ex: RoutineExerciseProp) => ex.id === exercise.id ? ex.inRoutine = true : null );
  }

  const handleDeleteExercise = ( exercise : RoutineExerciseProp ) => {
    setRoutineExercises(routineExercises.filter((ex: RoutineExerciseProp) => ex.id !== exercise.id));
    exercises.map((ex: RoutineExerciseProp) => ex.id === exercise.id ? ex.inRoutine = false : null );
  }

  const URL = 'http://127.0.0.1:8080/routine/post';

  const handleSaveRoutine = (routineExercises: RoutineExerciseProp[]) => {
    if (name === '') {
      modals.openContextModal({
        modal: 'expected',
        title: 'Save routine',
        centered: true,
        withCloseButton: false,
        size: 'sm',
        radius: 'md',
        innerProps: {
          modalBody: 'You have to give a name to the routine!',
        },
      });
      return;
    } else if (routineExercises.length === 0) {
      modals.openContextModal({
        modal: 'expected',
        title: 'Save routine',
        centered: true,
        withCloseButton: false,
        size: 'sm',
        radius: 'md',
        innerProps: {
          modalBody: 'You have to add at least one exercise to create a routine!',
        },
      });
      return;
    } else if (routinesList.find((routine: RoutineProp) => routine.name === name)) {
      modals.openContextModal({
        modal: 'expected',
        title: 'Save routine',
        centered: true,
        withCloseButton: false,
        size: 'sm',
        radius: 'md',
        innerProps: {
          modalBody: 'You already have a routine with this name!',
        },
      });
      return;
    } else {
      setLoading(true);
      // adaugare in baza de date
      const exercises = routineExercises.map(exercise => {
          const { id, name, muscleGroup } = exercise;
          return { id: id, name : name, muscle_group: muscleGroup, sets : [] }
        }
      )
      axios.post(URL, 
        {
          id: uuidv4(),
          user_id: user.userInfo.userId,
          name: name,
          exercises: exercises
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        setLoading(false);
        exercisesForRoutine.map((ex: RoutineExerciseProp) => ex.inRoutine = false);
        setName('');
        setRoutineExercises([]);
        console.log(response.data);
        handleClose();
        modals.openContextModal({
          modal: 'expected',
          title: 'Save routine',
          centered: true,
          withCloseButton: false,
          size: 'sm',
          radius: 'md',
          innerProps: {
            modalBody: 'Routine saved successfully!',
          },
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    }
  }

  const handleChangeNameRutine = ( e: any ) => {
      setName(e.target.value);
  }

  return (
    <Container>
      <Modal
        opened={opened}
        onClose={close}
        title='Exercises'
      >
        <MultiSelect
            placeholder="Pick value"
            defaultValue={['All Muscles']}
            clearable
            value={selectedExercises}
            onChange={setSelectedExercises}
            data={
                ['All Muscles', 'Legs', 'Back', 'Abdominals', 'Abductors', 'Biceps', 'Calves', 'Cardio', 'Chest', 'Full Body', 'Glutes', 'Lats', 'Neck', 'Shoulders', 'Traps', 'Triceps', 'Upper Back']
            }
        />
        <ListOfExercises 
          selectedExercises={selectedExercises} 
          handleAddExercise={handleAddExercise}
          handleDeleteExercise={handleDeleteExercise}
          exercises={exercises}
          />
      </Modal>
      <Input placeholder='Routine Name' maxLength={12} onChange={ e => handleChangeNameRutine(e)}/>

      {
        routineExercises.map( (exercise : RoutineExerciseProp) => {
          return (
            <Exercise key={exercise.id} exercise={exercise} handleDeleteExercise={handleDeleteExercise}/>
          )
        })
      }
      <Button variant='outline' color='blue' className='w-[100%] my-[10px]' onClick={open}>
        Add a exercise
      </Button>
      <Button variant='outline' color='green' className='w-[100%] my-[10px] text-white bg-green-600' onClick={() => handleSaveRoutine(routineExercises)}>
          {loading ? 'Create...' : 'Save'}
      </Button>
    </Container>
  );
}


export default NewRoutine;