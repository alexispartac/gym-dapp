import React from 'react'
import { Container } from '@mantine/core'
import { Skeleton, SkeletonText, Stack } from '@chakra-ui/react';

interface PostFeed {
  id: number;
  username: string;
  date: string;
  name: string;
  image: string;
  link: string;
  description: string;
}

const feedPosts = [
  {
    id: 1,
    username: 'XXXXX',
    date: '2021-01-01',
    name: 'Post 1',
    image: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    link: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    description: 'This is a post'
  },
  {
    id: 2,
    username: 'XXXXX',
    date: '2021-01-02',
    name: 'Post 2',
    image: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    link: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    description: 'This is a post'
  },
  {
    id: 3,
    username: 'XXXXX',
    date: '2021-01-03',
    name: 'Post 3',
    image: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    link: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    description: 'This is a post'
  },
  {
    id: 4,
    username: 'XXXXX',
    date: '2021-01-04',
    name: 'Post 4',
    image: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    link: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    description: 'This is a post'
  },
  {
    id: 5,
    username: 'XXXXX',
    date: '2021-01-05',
    name: 'Post 5',
    image: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    link: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    description: 'This is a post'
  },
  {
    id: 6,
    username: 'XXXXX',
    date: '2021-01-06',
    name: 'Post 6',
    image: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    link: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    description: 'This is a post'
  },
  {
    id: 7,
    username: 'XXXXX',
    date: '2021-01-07',
    name: 'Post 7',
    image: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    link: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    description: 'This is a post'
  },
  {
    id: 8,
    username: 'XXXXX',
    date: '2021-01-08',
    name: 'Post 8',
    image: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    link: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    description: 'This is a post'
  },
  {
    id: 9,
    username: 'XXXXX',
    date: '2021-01-09',
    name: 'Post 9',
    image: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    link: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    description: 'This is a post'
  },
  {
    id: 10,
    username: 'XXXXXX',
    date: '2021-01-10',
    name: 'Post 10',
    image: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    link: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    description: 'This is a post'
  }
]

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
  const [posts, setPosts] = React.useState<PostFeed[]>([]);

  React.useEffect(() => {
    setPosts(feedPosts);
  }, [])

  return (
    <Container>
      <div className='text-3xl'> Feed </div>
      <Stack my={"2rem"}>
          {
            posts.map((post: PostFeed) => {
              return (
                <SkeletonPost />
              )
            })
          }
      </Stack>
      <br />
      <br />
    </Container>
  )
}

export default Feed