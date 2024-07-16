import React from 'react'
import Nav from '../common/components/nav/nav'
import Search from './components/promotions/search';

type Props = {}

const Title = () => {
  return (
    <div className='text-system-white text-ptitle font-bold'>
      내가 좋아한 공연
    </div>
  )
}
const Promotions = (props: Props) => {
  return (
    <div className='flex flex-col min-h-screen justify-start bg-system-background p-4'>
      <Nav/>
      <Title/>
      <Search/>
    </div>
  )
}

export default Promotions