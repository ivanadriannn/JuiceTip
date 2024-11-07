import React from 'react'
import { IDetailFooterSection } from './DetailFooterSection.interfaces'

const DetailFooterSection = (props: IDetailFooterSection) => {
  const { title, body } = props
  return (
    <div>
      <p className='font-bold text-xl text-8c8c8c'>{title}</p>
      <hr className='h-0.5 bg-[#5d5d5d] opacity-50 my-2' />
      <p className='text-[#5d5d5d]'>{body}</p>
    </div>
  )
}

export default DetailFooterSection