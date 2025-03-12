import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

// Add Tasks
async function AddTaskData(data, setAT, isAdded, setIsAdded, setIsLoading) {
  setIsLoading(true);
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_KEY}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      toast.success("Task Added Successfully");
      setAT(false);
      setIsAdded(isAdded === false ? true : false);
    } else {
      toast.error(response);
    }
  } catch (errors) {
    console.log("Cannot Proceed To Add Task Due To :-", errors);
    toast.error("Cannot Add Task");
  }finally{
    setIsLoading(false);
  }
}

function AddTask({ setAT, isAdded, setIsAdded }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: ""
    }
  });

  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <form
      onSubmit={handleSubmit((data) => AddTaskData(data, setAT, isAdded, setIsAdded, setIsLoading))}
      className='grid border-2 border-gray-300 p-2 text-black'>
      
      {isLoading === true &&
        <div className='fixed flex inset-0 justify-center items-center bg-gray-100 bg-opacity-50 z-50'>
          <img
            src="./loader.gif" alt="Loading....."
            className='w-[100px] h-[100px]' />
        </div>
      }

      <label
        htmlFor="text"
        className='font-semibold mb-2'>Enter Task Name :-</label>

      <input type="text"
        {...register("name", { required: true })}
        className='border-2 border-gray-300 p-1' />
      {errors?.name && <p className='text-[12px] text-red-500'>Task Name Is Required</p>}


      <button
        type='submit'
        className='bg-gray-300 p-2 mt-2 font-semibold'>Add Task</button>
    </form>
  )
}

export default AddTask