import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

// View tasks feature 
async function ViewTasks(setTasks) {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_KEY}/tasks`);

    if (response.ok) {

      const resData = await response.json();
      setTasks(resData);
    } else {
      console.log("No Task Avaialable");
    }
  } catch (errors) {
    console.log("Cannot Proceed To Add Task Due To :-", errors);
  }
}
// Edit Task
async function EditTask(id, status ,isEdited, setIsEdited) {
  const datas = {
  id:id,
  status:status
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_KEY}/edit-task`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datas)
    });
    
    if (response.ok) {
      setIsEdited(isEdited===false ? true : false);
    } else {
      console.log(response);
    }
  } catch (errors) {
    console.log("Cannot Proceed To Edit Task Due To :-", errors);
  }
}
// Remove Task
async function RemoveTask(id, tasks, setTasks) {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_KEY}/remove-task`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id:id})
    });
    
    if (response.ok) {
      setTasks(tasks.filter(task => task._id !== id));
      toast.success("Task Deleted");
    } else {
      toast.error(response);
    }
  } catch (errors) {
    console.log("Cannot Proceed To Edit Task Due To :-", errors);
    toast.error("Could not delete task");
  }
}

function Tasks({ isAdded }) {
  const [tasks, setTasks] = useState();
  const [isEdited, setIsEdited] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    ViewTasks(setTasks);
  }, [isAdded, isEdited]);

  return (
    <div>
      {/* Tasks */}
      {tasks?.length > 0 ?
        <div className='px-2 w-full h-full'>
          {tasks?.map((task, index) =>
            <div
              key={index}>
              <div className={`flex justify-between px-3 border-b-2 border-[#35793729] hover:bg-[#35793729] `}>
                <div className='flex justify-between gap-x-3 w-full h-full'>
                  <button
                    onClick={() => EditTask(task?._id, task?.status===false?true:false, isEdited, setIsEdited)}>
                    {task?.status === false ?
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 64 64"
                        role="img"
                        aria-label="Error icon">
                        <circle cx="32" cy="32" r="32" fill="#F44336" />
                        <line
                          x1="20"
                          y1="20"
                          x2="44"
                          y2="44"
                          stroke="#FFFFFF"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        <line
                          x1="20"
                          y1="44"
                          x2="44"
                          y2="20"
                          stroke="#FFFFFF"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </svg> :
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 100 100"
                      >
                        <circle cx="50" cy="50" r="50" fill="#28a745" />
                        <polyline
                          points="30,50 45,65 70,35"
                          fill="none"
                          stroke="white"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>}
                  </button>
                  <p className='w-full h-full py-3 hover:cursor-pointer'>{task?.name}</p>
                </div>
                <button 
                className='text-red-500 font-semibold'
                onClick={()=>RemoveTask(task?._id, tasks, setTasks)}>Remove</button>
              </div>
            </div>)}

        </div>
        :
        <div className=' w-full h-full p-5 flex justify-center items-center'>
          <p className='font-semibold'>No tasks available</p>
        </div>}
    </div>
  )
}

export default Tasks