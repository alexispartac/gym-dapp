import { Container } from "@mantine/core";
import { WorkoutExercisesProp } from "../Workout";
import React from "react";


const ListOfExercises = (
    { exercises, handleAddExercise, handleDeleteExercise, selectedExercises }:
        {
            selectedExercises: string[];
            exercises: WorkoutExercisesProp[];
            handleAddExercise: (exercise: WorkoutExercisesProp) => void;
            handleDeleteExercise: (exercise: WorkoutExercisesProp) => void;
        }) => {

    const filterCategoryExercises = selectedExercises.map(
        (muscleGroup: string) => {
            if (muscleGroup === "All Muscles" && selectedExercises.length === 1)
                return exercises;

            return exercises.filter((exercise: WorkoutExercisesProp) => exercise.muscleGroup === muscleGroup);
        }
    );

    const Exercise = ({ exercise }: { exercise: WorkoutExercisesProp }) => {
        const [isInWorkout, setIsInWorkout] = React.useState<boolean>(exercise.inWorkout);

        const addExercise = () => {
            setIsInWorkout(true);
            handleAddExercise(exercise);
        }

        const deleteExercises = () => {
            setIsInWorkout(false);
            handleDeleteExercise(exercise);
        }

        return (
            <div className='flex flex-row my-[7px] mx-[2px] shadow-md shadow-gray-400'>
                {
                    isInWorkout ?
                        <div className='h-[50px] w-[5px] bg-blue-700'></div>
                        :
                        null
                }
                <h1 className='w-[80%] flex justify-start p-[10px]' > {exercise.name}</h1>
                <p className='flex justify-center w-[45px] p-[10px]' onClick={addExercise}> ✔️ </p>
                <p className='flex justify-center w-[42px] p-[10px]' onClick={deleteExercises}> ❌ </p>
            </div>
        );
    }

    return (
        <Container>
            {
                filterCategoryExercises.flat().map((exercise: WorkoutExercisesProp) => (
                    <Exercise key={exercise.id} exercise={exercise} />
                ))
            }
        </Container>
    );
}

export default ListOfExercises;