import MusicLikeButton from '../../../common/components/buttons/like_button_music'
import { Music, SetListMusic } from '../../types/index';
import Footer from '../../../common/components/footer';
import lockIcon from '../../img/lock_icon.png'
import {useRef} from 'react';
type Props = {
    musicList : Music [],
    musicLikeList : SetListMusic[],
    content : string,
    refundInfo : string,
    updateHeart : (id: any, value: boolean) => Promise<void>;
}
const ShowInfo = (props: Props) => {
    
    const ref = useRef();
    const { musicList, content, refundInfo,musicLikeList,updateHeart } = props
    return (
        <div className='w-full flex flex-col mt-5 py-10px'>
            {musicList.length > 0 ? 
            <div className="w-full">
                    <div className='text-primary text-pxl font-semibold'>
                        {`SetList - ${musicList.length} Songs`}
                        <div style={{border:'0.8px'}} className='flex flex-col w-full font-normal bg-gray-4 border-gray-3 rounded-2xl my-10px py-10px'>
                        {musicList?.map((song, index) => {
                            return (
                                <div key={song.id} className='flex flex-col justify-between items-center w-full'>
                                <div className='flex w-full flex-row justify-between items-center'>
                                    <div className='flex flex-row w-full items-center justify-between px-14px'>
                                        {song.isOpen === false ? <div className='flex flex-row items-center my-2'>
                                            <img src={lockIcon} className='h-4 mr-2 object-cover'/>
                                            <div className='text-white text-pmd'>공연에서 확인하세요</div>
                                        </div> :
                                        <div className='flex flex-col items-start'>
                                            <div className='text-white text-pmd'>{song.title}</div>
                                            <div className='text-white text-psm'>{song.artist}</div>
                                        </div>}
                                        <div className='flex flex-row items-center'>
                                            <MusicLikeButton updateHeart={updateHeart} id={musicLikeList[index]?.id} like={musicLikeList[index]?.song_like} like_num={musicLikeList[index]?.song_like_num}/>
                                        </div>
                                    </div>
                                </div>
                                    {index < musicList.length - 1 && (
                                        <div className='w-full h-0.5 bg-gray-3 mx-2 my-10px'></div>
                                    )}
                                </div>
                            )
                            
                        })}
                        </div>
                    </div>
                
            </div> :
            <div></div>}
            <div className='flex flex-col w-full mt-10px mb-100px'>
                <div className='text-primary text-pxl font-semibold'>
                    공연정보
                </div>
                <div className='flex flex-col bg-white rounded-xl p-22px mt-10px -mx-4 whitespace-pre-wrap break-all'>
                    {content}
                </div>
                <div className='text-plg text-gray-2 pb-10px pt-5'>
                    환불정보
                </div>
                <div className='text-plg text-gray-2 break-all'>
                    {refundInfo}
                </div>
            </div>
            <Footer/>
        </div>
        
        
    )
}

export default ShowInfo
