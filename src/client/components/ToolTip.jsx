import React from 'react'

const ToolTip = ({info}) => {
  return (
    <>
    <div className='w-auto h-auto py-4 absolute'>
        <h1>{info}</h1>
    </div>
    </>
  )
}

export default ToolTip