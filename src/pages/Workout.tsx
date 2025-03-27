import React from 'react'
import { Container, Button, Stack, Group, Modal } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react';
import { RoutinesElements } from './Routines';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ExerciseProp, exercises } from './Exercises';
interface ExerciseWorkoutProp extends ExerciseProp {
  inWorkout?: boolean;
}

const exercisesWorkoutImport: ExerciseWorkoutProp[] = exercises.map(
  (exercise: ExerciseProp) => {
    return {
      ...exercise,
      inWorkout: false
    };
  }
);

// lista cu exercitii can apasam pe add exercises
const ListOfExercises = ({ exercises, handleAddExercise }: { exercises: ExerciseWorkoutProp[], handleAddExercise: (exercise: ExerciseWorkoutProp) => void }) => {

  const Exercise = () => {
    return (
      <Container>
      </Container>
    );
  }


  return (
    <Container>
      <Exercise />
      {
        exercises.map((exercise: ExerciseProp) => (
          <h1 key={exercise.name} onClick={() => handleAddExercise(exercise)}> {exercise.name}</h1>
        ))
      }
    </Container>
  );
}

// structura unui exercitiu
const Exercise = ({ exercise, onClick }: { exercise: ExerciseWorkoutProp, onClick: () => void }) => {
  const [sets, setSets] = React.useState([
    { setNumber: 1, kg: 36, reps: 12, previous: '36kg x 12' },
    { setNumber: 2, kg: 50, reps: 12, previous: '50kg x 12' },
    { setNumber: 3, kg: 50, reps: 12, previous: '50kg x 12' },
  ]);

  console.log(sets);

  const addSet = () => {
    const newSet = {
      setNumber: sets.length + 1,
      kg: 0,
      reps: 0,
      previous: '',
    };
    setSets([...sets, newSet]);
  };

  const deleteSet = (setNumber: number) => {
    const updatedSets = sets.filter((set) => set.setNumber !== setNumber);
    updatedSets.forEach((set, index) => {
      set.setNumber = index + 1;
    });
    setSets(updatedSets);
  };

  return (
    <div className='py-[10px]'>
      <div>
        <h3 className='text-xl'> {exercise.name} </h3>
        <input placeholder='Add notes here...' className='font-serif italic color-#aaa p-1 my-1' />
      </div>

      <div className='w-full'>
        <div className='flex flex-row'>
          <p className='flex justify-center w-[50px] p-[10px]'> SET </p>
          <p className='flex justify-center w-[100px] p-[10px]'> PREVIOUS </p>
          <p className='flex justify-center w-[40px] p-[10px]'> KG </p>
          <p className='flex justify-center w-[60px] p-[10px]'> REPS </p>
          <p className='flex justify-center w-[45px] p-[10px]'> ✔️ </p>
          <p className='flex justify-center w-[42px] p-[10px]'> ❌ </p>
        </div>
        <div>
          {sets.map((set) => (
            <div className='flex flex-row' key={set.setNumber}>
              <p className='flex justify-center w-[50px] p-[10px]'>{set.setNumber}</p>
              <p className='flex justify-center w-[100px] p-[10px]'>{set.previous}</p>
              <p className='w-[40px] p-[10px]'>
                <input className='w-[25px]' placeholder={`${set.kg}`} />
              </p>
              <p className='w-[60px] p-[10px]'>
                <input className='w-[25px]' placeholder={`  ${set.reps}`} />
              </p>
              <p className='w-[45px] p-[10px]'> ✔️ </p>
              <p className='w-[42px] p-[10px]' onClick={() => deleteSet(set.setNumber)} > ❌ </p>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant='outline'
        color='black'
        className='flex w-full align-start md:pl-[50px] my-[10px]'
        onClick={addSet}
      >
        + Add Set
      </Button>

      <Button
        variant='outline'
        color='red'
        className='flex w-full align-start md:pl-[50px] my-[10px]'
        onClick={onClick}
      >
        - Delete Exercise
      </Button>

      {/* Footer Buttons
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button style={{ backgroundColor: '#666', color: 'white', padding: '10px', border: 'none' }}>Settings</button>
          <button style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '10px', border: 'none' }}>
            Discard Workout
          </button>
        </div> */}
    </div>
  );
};

// exercitiile din workout
const WorkoutExercises = () => {
  const [workoutExercises, setWorkoutExercises] = React.useState<ExerciseWorkoutProp[]>(exercisesWorkoutImport);

  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');


  React.useEffect(() => {
    setWorkoutExercises(workoutExercises.filter((ex) => ex.inWorkout === true));
  }, []);

  const handleAddExercise = (exercise: ExerciseProp) => {
    setWorkoutExercises([...workoutExercises, { ...exercise, inWorkout: true }]);
  };

  const handleRemoveExercise = (name: string) => {
    setWorkoutExercises((prevList) => prevList.filter((ex) => ex.name !== name));
  };

  const discardWorkout = () => {
    setWorkoutExercises([]);
  };

  return (
    <Container p={0} className='flex flex-col border-t-[1px] border-black'>
      {
        // daca nu sunt exercitii in workout ul nostru afisam blocul executat pe true altfel afisam
        // exercitiile 
        workoutExercises.length === 0 ?
          <Stack className='flex flex-col items-center justify-center border-t-[1px] border-black'>
            <IconPlus size={120} color='gray' />
            <h1 className='text-2xl font-bold text-gray-800' > Get Started </h1>
            <p> Add a exercise to start your workout </p>
          </Stack>
          :
          workoutExercises.map((exercise: ExerciseWorkoutProp, index: number) => (
            <Exercise key={index} exercise={exercise} onClick={() => handleRemoveExercise(exercise.name)} />
          ))
      }

      {/* lista cu exercitii  */}
      <Container>
        <Modal
          opened={opened}
          onClose={close}
          fullScreen={isMobile}
          transitionProps={{ transition: 'fade-up', duration: 700 }}
          title='Exercises' // ﹀
          padding={7}
        >
          <ListOfExercises exercises={exercisesWorkoutImport} handleAddExercise={handleAddExercise} />
        </Modal>
      </Container>

      {/* buton de adaugare exercitiu */}
      <Button
        variant='outline'
        color='blue'
        className='flex w-full align-start md:pl-[50px] my-[10px] bg-blue-700 text-white'
        onClick={open}
      >
        + Add Exercise
      </Button>
      <Button
        variant='outline'
        color='red'
        className='flex w-full align-start md:pl-[50px] my-[10px] bg-red-700 text-white'
        onClick={discardWorkout}
      >
        Discard Workout
      </Button>
    </Container>
  );
}

const NewWorkout = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');


  return (
    <Container m={0} p={0}>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen={isMobile}
        transitionProps={{ transition: 'fade-up', duration: 700 }}
        title='Log Workout' // ﹀
        padding={7}
      >
        <Container className='bg-white shadow-xl'>
          <Group className='grid grid-cols-3 gap-4 py-[5px] font-light'>
            <Stack gap={0}>
              <p> Duration </p>
              <p> [date] </p>
            </Stack>
            <Stack gap={0}>
              <p> Volume </p>
              <p> [volume] </p>
            </Stack>
            <Stack gap={0}>
              <p> Sets </p>
              <p> [sets] </p>
            </Stack>
          </Group>
          <br />
          <WorkoutExercises />
          <br />
        </Container>
      </Modal>

      <Button
        variant='outline'
        color='blue'
        className='flex w-full align-start md:pl-[50px]'
        onClick={open}
      >
        <Group >
          <IconPlus className='mr-2' />
          Start Empty Workout
        </Group>
      </Button>
    </Container>
  );
}

// componenta principala
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