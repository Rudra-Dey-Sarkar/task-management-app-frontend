import React, { useState } from 'react'
import Topbar from '../Topbar/Topbar'
import Tasks from '../Tasks/Tasks'

function Main() {
    const [isAdded, setIsAdded] = useState(false);

  return (
    <div>
        {/* Topbar feature to add new tasks */}
        <Topbar isAdded={isAdded} setIsAdded={setIsAdded} />
        {/* Tasks feature to view, edit, and remove tasks */}
        <Tasks  isAdded={isAdded} />
    </div>
  )
}

export default Main