import Nav from '../common/components/nav/nav'
import useCheckAuth from '../utils/hooks/useCheckAuth'
import checker_img_lg from './img/checker_img_lg.png'
import Navigation from './navigation'
type Props = {}
const Profile = () => {

    const {memberInfo, isLoading}  = useCheckAuth();
    
    return (
        <div className='flex flex-col justify-center items-center mb-50px'>
            <img style={{ display: isLoading ? 'none' : undefined }} 
                  src={memberInfo.profileImg === null ? checker_img_lg : memberInfo.profileImg} 
                  className='w-114px h-114px rounded-xl transition-all'></img>
            <div className='text-2xl font-bold text-white mt-10px'>{memberInfo.name}</div>
        </div>
    )
}
const MyPage = (props: Props) => {
  return (
    <div className='flex flex-col min-h-screen justify-start bg-system-background p-4'>
        <Nav/>
        <Profile/>
        <Navigation/>
    </div>
  )
}

export default MyPage