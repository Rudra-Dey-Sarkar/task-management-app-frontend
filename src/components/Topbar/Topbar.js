import React, { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import AddTask from '../AddTask/AddTask';

function Topbar({ isAdded, setIsAdded }) {
    const [AT, setAT] = useState(false);


    return (
        <div className='flex justify-between bg-green-100 px-5 py-4'>

            {/* Add task feature */}
            {AT === true &&
                <div
                    className='flex fixed inset-0 justify-center items-center bg-black bg-opacity-50 z-50'
                    onClick={() => setAT(false)}>
                    <div
                        className='bg-white p-5 rounded-[10px]'
                        onClick={(e) => e.stopPropagation()}>
                        <AddTask setAT={setAT} isAdded={isAdded} setIsAdded={setIsAdded} />
                    </div>
                </div>
            }

            {/* Top text */}
            <p className='text-[1.4rem] font-semibold underline'>All Tasks :-</p>

            {/* Add new task button */}
            <button
                className='flex justify-center items-center font-semibold border-2 border-black px-4 py-1 rounded-[5px] hover:scale-105'
                onClick={() => {
                    setAT(true)
                }} >
                Add <PlusIcon size={20} /></button>
        </div>
    )
}

export default Topbar