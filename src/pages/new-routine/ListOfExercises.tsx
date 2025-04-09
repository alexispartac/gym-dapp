import { Container } from "@mantine/core";
import { RoutineExerciseProp } from "../Routines";
import React from "react";

const ListOfExercises = (
    { exercises, handleAddExercise, handleDeleteExercise, selectedExercises }:
        {
            selectedExercises: string[];
            exercises: RoutineExerciseProp[];
            handleAddExercise: (exercise: RoutineExerciseProp) => void;
            handleDeleteExercise: (exercise: RoutineExerciseProp) => void;
        }) => {

    const filterCategoryExercises = selectedExercises.map(
        (muscleGroup: string) => {
            if (muscleGroup === "All Muscles" && selectedExercises.length === 1)
                return exercises;

            return exercises.filter((exercise: RoutineExerciseProp) => exercise.muscleGroup === muscleGroup);
        }
    );

    const Exercise = ({ exercise }: { exercise: RoutineExerciseProp }) => {
        const [isIn, setIsIn] = React.useState<boolean>(exercise.inRoutine);

        const addExercise = () => {
            setIsIn(true);
            handleAddExercise(exercise);
        }

        const deleteExercises = () => {
            setIsIn(false);
            handleDeleteExercise(exercise);
        }

        return (
            <div className='flex flex-row my-[7px] mx-[2px] shadow-md shadow-gray-400'>
                {
                    isIn ?
                      <div className='h-[50px] w-[5px] bg-blue-700'></div>
                      :
                      null
                }
                <h1 className='w-[80%] flex justify-start p-[10px]' > {exercise.name}</h1>
                <button disabled={isIn} className='flex justify-center w-[45px] p-[10px]' onClick={addExercise}> ✔️ </button>
                <button disabled={!isIn} className='flex justify-center w-[42px] p-[10px]' onClick={deleteExercises}> ❌ </button>
            </div>
        );
    }

    return (
        <Container>
            {
                filterCategoryExercises.flat().map((exercise: RoutineExerciseProp) => (
                  <Exercise key={exercise.id} exercise={exercise} />
                ))
            }
        </Container>
    );
}

export default ListOfExercises;
