import React from 'react'
// import { v4 as uuidv4 } from 'uuid';

import { Container,  Button} from '@mantine/core'
import { Badge, HStack } from "@chakra-ui/react"
import Carousel  from "../components/ui/card-carousel"

export interface ExerciseProp {
  name: string;
  muscleGroup: string;
  id: string;
}

export function CardsCarousel() {
  const cards = exercises.map((card, index) => (
    <Exercise key={index} exercise={card} />
  ));

  return (
    <div className="w-full h-full py-5">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-4xl text-black font-sans">
         "Category"
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

export const Exercise = ( { exercise } : {exercise: ExerciseProp} ) => (
  <div className='flex w-[210px] rounded-md border-[1px] shadow-md flex-row my-2'>
    <div className='flex flex-col px-3 py-4 w-full'>
        <div> { exercise.name } </div>
        <HStack>
          <Badge> { exercise.muscleGroup } </Badge>
        </HStack>
        <div className='flex flex-row justify-between pt-1'>
          <Button variant='outline' color='blue' className='flex justify-center w-[100%]'> View </Button>
        </div>
    </div>
  </div>
)

export const exercises = [  
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
  },
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
  },
  {
    name: 'Lunges',
    muscleGroup: 'Legs',
    id: '7'
  },
  {
    name: 'Plank',
    muscleGroup: 'Core',
    id: '8'
  },
  {
    name: 'Pull-Up',
    muscleGroup: 'Back',
    id: '9'
  },
  {
    name: 'Dumbbell Rows',
    muscleGroup: 'Back',
    id: '10'
  },
  {
    name: 'Lat Pulldown',
    muscleGroup: 'Back',
    id: '11'
  },
  {
    name: 'Cable Crossover',
    muscleGroup: 'Back',
    id: '12'
  },
  {
    name: 'Leg Press',
    muscleGroup: 'Legs',
    id: '13'
  },
  {
    name: 'Chest Fly',
    muscleGroup: 'Chest',
    id: '14'
  },
  {
    name: 'Shoulder Press',
    muscleGroup: 'Shoulders',
    id: '15'
  },
  {
    name: 'Tricep Kickback',
    muscleGroup: 'Arms',
    id: '16'
  },
  {
    name: 'Hamstring Curl',
    muscleGroup: 'Legs',
    id: '17'
  },
  {
    name: 'Calf Raises',
    muscleGroup: 'Legs',
    id: '18'
  },
  {
    name: 'Barbell Curl',
    muscleGroup: 'Arms',
    id: '19'
  },
  {
    name: 'Skull Crushers',
    muscleGroup: 'Arms',
    id: '20'
  }
]


const Exercises = () => {
  return (
    <Container p={0} mb={"50px"}>
      <br />
      <h1 className='text-5xl md:text-7xl'> Exercises </h1>
      <br />
      <CardsCarousel />
      <CardsCarousel />
      <CardsCarousel />
      <CardsCarousel />
      <CardsCarousel />
      <CardsCarousel />
      <br />
    </Container>
  )
}

export default Exercises