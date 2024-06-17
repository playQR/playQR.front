import { useEffect } from 'react'
import Nav from '../components/nav';
import InfoComponent from '../components/info/infocomponent';
import Search from '../components/search/search';
import KakaoModal from '../login/Modal';
import PromotionInfo from './promotioninfo';
import {axiosAPI} from '../axios/index';
import BottomButton from './bottombutton';
import {useParams} from 'react-router-dom';
type Props = {}
type SetListType = {
    song_title : string,
    song_artist : string,
    song_like : boolean,
    song_like_num : number
}
type PromotionType = {
    img : string | undefined,
    band_name : string,
    title : string,
    location : string,
    date : string, 
    price : string,
    setlist : SetListType [],
    promotion_info : string,
    refund_info : string
}

const mockSetList: SetListType[] = [
    {
      song_title: "Bohemian Rhapsody",
      song_artist: "Queen",
      song_like: true,
      song_like_num: 50,
    },
    {
      song_title: "Stairway to Heaven",
      song_artist: "Led Zeppelin",
      song_like: false,
      song_like_num: 31,
    },
    {
      song_title: "Hotel California",
      song_artist: "Eagles",
      song_like: true,
      song_like_num: 43,
    },
    {
      song_title: "Imagine",
      song_artist: "John Lennon",
      song_like: false,
      song_like_num: 31,
    },
    {
      song_title: "Hey Jude",
      song_artist: "The Beatles",
      song_like: true,
      song_like_num: 55,
    },
  ];
  const example_promotion_info: PromotionType[] = [{
    img: undefined,
    band_name: "The Rolling Stones",
    title: "Live in Concert",
    location: "홍대, 프라자3층",
    date: "2024-07-04",
    price: "15000₩",
    setlist: mockSetList,
    promotion_info: "Join us for an unforgettable night with The Rolling Stones. Experience the classics live!",
    refund_info: "Refunds are available up to 7 days before the event. No refunds will be given after this period.",
  }];
const PromotionView = (props: Props) => {

    
    const { id } = useParams()
    // useEffect(() => {
    //     axiosAPI.get('/promotion', {
    //         params: {
    //             id: id
    //         }
    //     }).then((res) => {
    //         console.log(res.data)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }, [])

    return (
        <div className='w-full'>
            <div className='flex flex-col min-h-screen w-full bg-system-background p-4'>
                <KakaoModal/>
                <Nav/>
                <PromotionInfo promotion_info={example_promotion_info[Number(id)]}/>
            </div>
            <BottomButton/>
        </div>
    )
}

export default PromotionView