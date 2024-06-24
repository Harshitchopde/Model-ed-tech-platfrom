import React from 'react'

const HighLightText = ({text}) => {
  return (
    <div className='bg-gradient-to-b  from-[#1FA2FF] via-[#12D8FA] text-transparent bg-clip-text to-[#A6FFCB] font-bold'>
      {" "}{text}
    </div>
  )
}

export default HighLightText
