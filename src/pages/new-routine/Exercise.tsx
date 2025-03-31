import { RoutineExerciseProp } from "../Routines";


const Exercise = ( 
  { exercise, handleDeleteExercise } : 
  { 
    exercise: RoutineExerciseProp
    handleDeleteExercise: (exercise: RoutineExerciseProp) => void;
  }) => {
  return (
    <div className='flex flex-row my-[7px] mx-[2px] shadow-sm shadow-gray-400'>
      <h1 className='w-[80%] flex justify-start p-[10px]'> { exercise.name } </h1>
      <p className='flex justify-center w-[42px] p-[10px]' onClick={() => handleDeleteExercise(exercise)}> ❌ </p>
    </div>
  );
}

export default Exercise;