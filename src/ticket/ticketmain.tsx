import React from 'react'
import Nav from '../common/components/nav/nav';
import { Link } from 'react-router-dom';
import Title from './components/title';
import SearchBox from './components/search/searchbox';
import Dashboard from './components/dashboard';
type Props = {}

const Ticket = (props: Props) => {
  return (
    <div className='flex flex-col min-h-screen justify-start bg-system-background p-4'>
        <Nav/>
        <Title/>
        {/* <SearchBox/> */}
        <Dashboard/>
    </div>
  )
}

export default Ticket