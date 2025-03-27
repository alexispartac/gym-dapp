import React from 'react'
import { Container,  Button} from '@mantine/core'
import { Badge, HStack } from "@chakra-ui/react"
import Carousel  from "../components/ui/card-carousel"

export interface ExerciseProp {
  name: string;
  muscleGroup: string;
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
    muscleGroup: 'Chest'
  },
  {
    name: 'Squat',
    muscleGroup: 'Legs',
  },
  {
    name: 'Deadlift',
    muscleGroup: 'Back',
  },
  {
    name: 'Overhead Press',
    muscleGroup: 'Shoulders',
  },
  {
    name: 'Bicep Curl',
    muscleGroup: 'Arms',
  },
  {
    name: 'Tricep Extension',
    muscleGroup: 'Arms',
  },
  {
    name: 'Lunges',
    muscleGroup: 'Legs',
  },
  {
    name: 'Plank',
    muscleGroup: 'Core',
  },
  {
    name: 'Lat Pulldown',
    muscleGroup: 'Back',
  },
  {
    name: 'Calf Raises',
    muscleGroup: 'Legs',
  },
  {
    name: 'Barbell Row',
    muscleGroup: 'Back',
  },
  {
    name: 'Dumbbell Fly',
    muscleGroup: 'Chest',
  },
  {
    name: 'Hamstring Curl',
    muscleGroup: 'Legs',
  },
  {
    name: 'Skull Crushers',
    muscleGroup: 'Arms',
  },
  {
    name: 'Leg Press',
    muscleGroup: 'Legs',
  },
  {
    name: 'Incline Bench Press',
    muscleGroup: 'Chest',
  },
  {
    name: 'Russian Twist',
    muscleGroup: 'Core',
  },
  {
    name: 'Seated Row',
    muscleGroup: 'Back',
  },
  {
    name: 'Preacher Curl',
    muscleGroup: 'Arms',
  },
  {
    name: 'Leg Extension',
    muscleGroup: 'Legs',
  },
  {
    name: 'Dumbbell Shoulder Press',
    muscleGroup: 'Shoulders',
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