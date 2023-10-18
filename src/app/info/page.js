import React from 'react'

const Info = () => {
    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-3 duration-300'>
                <div className='bg-red-300 h-[calc(100vh_-_5.5rem)]' />
                <div className=' bg-green-300 h-[calc(100vh_-_5.5rem)]' />
                <div className=' bg-blue-300 h-[calc(100vh_-_5.5rem)]' />
                <div className=' bg-yellow-300 h-[calc(100vh_-_5.5rem)]' />
            </div>
        </>
    )
}

export default Info