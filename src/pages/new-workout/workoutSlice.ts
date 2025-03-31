import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutExercisesProp } from '../Workout';
import { SetProp } from './Exercise';

interface WorkoutState {
  exercises: WorkoutExercisesProp[];
}

const initialState: WorkoutState = {
  exercises: [],
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    // adauga un exercitiu nou
    addExercise(state, action: PayloadAction<{ name: string; muscleGroup: string; id: string, inWorkout: boolean, sets: SetProp[] }>) {
      state.exercises.push({
        ...action.payload, 
        inWorkout: true
      });
    },

    // adauga set la un exercitiu
    addSetToWorkout(state, action: PayloadAction<{ set: SetProp, id: string }>) {
      const indexExercise = state.exercises.findIndex(exercise => exercise.id === action.payload.id);
  
      if (indexExercise !== -1) {
          const exercise = state.exercises[indexExercise];
          const indexSet = exercise.sets.findIndex(set => set.setNumber === action.payload.set.setNumber);
          if (indexSet !== -1) {
              exercise.sets[indexSet] = action.payload.set;
          } else {
              exercise.sets.push(action.payload.set);
          }
          state.exercises[indexExercise] = exercise;
      }
  },

    // aici trebuie modificat
    // addSetToWorkout(state, action: PayloadAction<{ set: SetProp, id: string } > ) {
    //   const exercise = state.exercises.find(exercise => exercise.id === action.payload.id);
    //   if( exercise ){
    //     const indexSet = exercise.sets.findIndex( set => action.payload.set.setNumber === set.setNumber)
    //     if (indexSet !== -1) 
    //     exercise.sets.splice(indexSet, 1);
    //   }
    //   exercise?.sets.push(action.payload.set);
    //   const indexExercise = state.exercises.findIndex(exercise => exercise.id === action.payload.id);
    //   if (indexExercise !== -1) 
    //     state.exercises.splice(indexExercise, 1);
    //   if( exercise )
    //     state.exercises.push(exercise);
    // },
    
    removeSetToWorkout(state, action: PayloadAction<{ setNumber: number; id: string }>) {
      const { setNumber, id } = action.payload;
      const indexExercise = state.exercises.findIndex((exercise) => exercise.id === id);
      const exercise = state.exercises[indexExercise];

      if (exercise) {
        exercise.sets = exercise.sets.filter((set) => set.setNumber !== setNumber);
        exercise.sets = exercise.sets.map((set, index) => ({
          ...set,
          setNumber: index + 1,
        }));
        state.exercises[indexExercise] = exercise;
      }
    },
    
    // removeSetToWorkout(state, action: PayloadAction<{ setNumber: number, id: string }>) {
    //   const exercise = state.exercises.find(exercise => exercise.id === action.payload.id);
    //   if( exercise ){
    //     const indexSet = exercise.sets.findIndex( set => action.payload.setNumber === set.setNumber)
    //     if (indexSet !== -1) 
    //     exercise.sets.splice(indexSet, 1);
    //   }
    //   const indexExercise = state.exercises.findIndex(exercise => exercise.id === action.payload.id);
    //   if (indexExercise !== -1) 
    //     state.exercises.splice(indexExercise, 1);
    //   if( exercise )
    //     state.exercises.push(exercise);
    // },

    // sterge un exercitiu dupa id
    
    removeExercise(state, action: PayloadAction<{ id: string }>) {
      const index = state.exercises.findIndex(exercise => exercise.id === action.payload.id);
      if (index !== -1) {
        state.exercises.splice(index, 1);
      }
    },
    // sterge toate exercitiile
    clearExercises(state) {
      state.exercises = [];
    },

  },
});

export const { addExercise, removeExercise, clearExercises, addSetToWorkout, removeSetToWorkout } = workoutSlice.actions;

export default workoutSlice.reducer;
