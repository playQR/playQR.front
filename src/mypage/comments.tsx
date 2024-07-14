import React from 'react'
import Nav from '../common/components/nav/nav'
import Search from './components/comments/search/search'

type Props = {}
const Title = () => {
  return (
    <div className='text-system-white text-ptitle font-bold'>
      내 댓글
    </div>
  )
}

const Comments = (props: Props) => {
  return (
    <div className='flex flex-col min-h-screen justify-start bg-system-background p-4'>
      <Nav/>
      <Title/>
      <Search/>
    </div>
  )
}

export default Comments