import React from 'react'
import LikeButton from '../components/buttons/like_button'
import MusicLikeButton from '../components/buttons/like_button_music'
type SetListType = {
    song_title : string,
    song_artist : string,
    song_like : boolean,
    song_like_num : number
  }
type Props = {
    setList : SetListType []
}


const ShowInfo = (props: Props) => {
    const setlist = props?.setList
    return (
        <div className='w-full flex flex-col mt-5 py-10px'>
            {setlist.length > 0 ? 
            <div className="w-full">
                    <div className='text-primary text-pxl font-semibold'>
                        {`SetList - ${setlist.length} Songs`}
                        <div style={{border:'0.8px'}} className='flex flex-col w-full font-normal bg-gray-4 border-gray-3 rounded-2xl my-10px py-10px'>
                        {setlist.map((song, index) => {
                            return (
                                <div key={index} className='flex flex-col justify-between items-center w-full'>
                                <div className='flex w-full flex-row justify-between items-center'>
                                    <div className='flex flex-row w-full items-center justify-between px-14px'>
                                        <div className='flex flex-col items-start'>
                                            <div className='text-white text-pmd'>{song.song_title}</div>
                                            <div className='text-white text-psm'>{song.song_artist}</div>
                                        </div>
                                        <div className='flex flex-row items-center'>
                                            <MusicLikeButton like={song.song_like} like_num={song.song_like_num}/>
                                        </div>
                                    </div>
                                </div>
                                    {index < setlist.length - 1 && (
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
                <div className='flex flex-col bg-white rounded-xl p-22px mt-10px -mx-4'>
                    이렇게 달래 놓고는 황급히 불을 활활 피워
                    발과 시냇물에 젖은 옷을 말리게 했습니다.

                    누구나 이런 밤의 세계에 익숙하지 못한 사람
                    은 좀 무서워질 것입니다만. 그런데, 지금 그 
                    아가씨가 바로 내 눈앞에 와 있는 것입니다. 그러나 가엾은 아가씨는 불을 쬐려고도, 무엇을 

                    먹어볼 생각도 하지 않았습니다. 그리고, 그 돌
                    멩이 하나가 그대로 내 심장 위에 덜컥덜컥 떨
                    어져 내리는 것 같았습니다. 병아리장은 남들
                    보다 일찍 서둘러서 맨 먼저 떠나 윗길로 접어
                    들었다 나요. 맑은 산 정기와, 소나기 뒤에 싸
                    늘하게 씻긴 공기를 씌어 얼굴이 온통 발갛게 
                    상기되어 있었습니다. 이때까지 밤하늘이 그
                    렇게도 유난히 깊고, 별들이 그렇게도 찬란하
                    게 보인 적은 없었습니다.
                </div>
                <div className='text-plg text-gray-2 pb-10px pt-5'>
                환불정보
                </div>
                <div className='text-plg text-gray-2'>
                이때까지 밤하늘이 그렇게도 유난히 깊고, 별들이
                그렇게도 찬란하게 보인 적은 없었습니다. 병아리장은
                남들보다 일찍 서둘러서 맨 먼저 떠나 윗길로 접어들
                었다 나요. 우리 아가씨가 노새 등에 실린 버들고리
                사이에 의젓이 올라타고 몸소 나타난 것입니다.
                </div>
            </div>
            <div className='h-100px'>
                {/* 모든 정보를 보여주기 위한 마진 */}
            </div>
        </div>
        
        
    )
}

export default ShowInfo