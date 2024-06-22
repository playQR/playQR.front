import React from 'react'

type Props = {
    children: React.ReactNode
}

const Container = (props: Props) => {
  return (
    <div className="flex w-screen justify-center bg-system-background">
        {props.children}
    </div>
  )
}

export default Container