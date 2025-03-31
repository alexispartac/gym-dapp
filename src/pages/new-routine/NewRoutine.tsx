import { Button, Container, Input, Modal, MultiSelect } from "@mantine/core";
import Exercise from "./Exercise";
import { exercisesForRoutine, RoutineExerciseProp, routinesList } from "../Routines";
import ListOfExercises from "./ListOfExercises";
import { useDisclosure } from "@mantine/hooks";
import React from "react";


const NewRoutine = ( { exercises, handleClose } : { exercises : RoutineExerciseProp[], handleClose: () => void } ) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [routineExercises, setRoutineExercises] = React.useState<RoutineExerciseProp[]>([]);
  const [name, setName] = React.useState<string>('');
  const [selectedExercises, setSelectedExercises] = React.useState<string[]>(['All Muscles']);  // categoriile de exercitii


  const handleAddExercise = ( exercise : RoutineExerciseProp ) => { 
    setRoutineExercises([...routineExercises, { ...exercise, inRoutine: true}]); 
    exercises.map((ex: RoutineExerciseProp) => ex.id === exercise.id ? ex.inRoutine = true : null );
  }

  const handleDeleteExercise = ( exercise : RoutineExerciseProp ) => {
    setRoutineExercises(routineExercises.filter((ex: RoutineExerciseProp) => ex.id !== exercise.id));
    exercises.map((ex: RoutineExerciseProp) => ex.id === exercise.id ? ex.inRoutine = false : null );
  }

  const handleSaveRoutine = ( routineExercises : RoutineExerciseProp[] ) => {
    let flag = routineExercises.length === 0 || name === '' ? false : true;
    if(flag){
      //  inserare in baza de date a utilizatorului
      routinesList.push({ name: name, exercises: routineExercises });
      //  resetare 
      exercisesForRoutine.map((ex: RoutineExerciseProp) => ex.inRoutine = false );
      setRoutineExercises([]);
      setName('');
      console.log('Rutina salvata cu succes!');
      handleClose();
    } else {
      console.log('Rutina nu a fost salvata!');
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
      <Input placeholder='Routine Name' onChange={ e => handleChangeNameRutine(e)}/>

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
      <Button variant='outline' color='white' className='w-[100%] my-[10px] bg-green-600' onClick={() => handleSaveRoutine(routineExercises)}>
        Create Routine
      </Button>
    </Container>
  );
}


export default NewRoutine;