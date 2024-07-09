import React from 'react'

type Props = {}

const Warning = (props: Props) => {
  return (
    <div className='text-system-error text-psm'>
        환불 및 입금 관련 책임은 공연 주최자에게 있으며,
        Bandit는 이에 대한 책임을 지지 않습니다.
        <br/>
        공연 관련 문의는 공연 주최자를 통해 문의주시길 바랍니다.
</div>
  )
}

export default Warning