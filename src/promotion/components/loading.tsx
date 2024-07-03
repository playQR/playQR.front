import React, {CSSProperties} from 'react'
import HashLoader from 'react-spinners/HashLoader'
type Props = {
    isLoading: boolean
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#1FDA00",
};

const Loading = (props: Props) => {
    const { isLoading } = props
  return (
    <div className='flex flex-col items-center justify-items-center w-full bg-system-background my-24'>
        <HashLoader color={'#1FDA00'} loading={isLoading} size={150} />
        <div className='text-primary text-plg text-center font-bold mt-5'>
            공연을 등록 중입니다.
        </div>
    </div>
  )
}

export default Loading