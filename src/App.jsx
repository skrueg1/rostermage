import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setEvents] = useState([]);


  return (
      <div className="App">
        <div className="unhomed-task-holder">
            <h1>Unhomed Tasks</h1>
            <button>Add Task</button>
            <div className="tasks-container"></div>
        </div>


        <div className="schedule-container">
          <h1>Interactable Schedule</h1>
          <div className="mock-schedule">

          </div>
        </div>
      </div>
  )
}

export default App