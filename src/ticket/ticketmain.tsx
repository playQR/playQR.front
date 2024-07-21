import Nav from '../common/components/nav/nav';
import Title from './components/title';
import Dashboard from './components/dashboard';
import CustomToast from '../common/components/toast/customtoast';
type Props = {}

const Ticket = (props: Props) => {
  return (
    <div className='flex flex-col min-h-screen justify-start bg-system-background p-4'>
        <CustomToast/>
        <Nav/>
        <Title/>
        <Dashboard/>
    </div>
  )
}

export default Ticket