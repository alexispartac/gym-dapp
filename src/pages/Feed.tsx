import React from 'react'
import { Container } from '@mantine/core'
import { Skeleton, SkeletonText, Stack } from '@chakra-ui/react';



const SkeletonPost = () => {
  return (
    <div className='flex flex-col py-5'>
      <SkeletonText noOfLines={2}/>
      <br />
      <Skeleton height="200px" />
    </div>
  )
}

const Feed = () => {

  return (
    <Container className='py-[100px]'>
      <div className='text-3xl'> Feed </div>
      <Stack my={"2rem"}>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
      </Stack>
      <br />
      <br />
    </Container>
  )
}

export default Feed