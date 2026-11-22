import { useState } from 'react'
import './App.css'

function App() {

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDuration, setTaskDuration] = useState("");

  function handleSubmit(e) {
      e.preventDefault();

      const newTask = {
          title: taskTitle,
          duration: Number(taskDuration)
      };

      setTasks((currentTasks) => [...currentTasks, newTask]);

      setTaskTitle("");
      setTaskDuration("");
      setShowForm(false);
  }

  return (
      <div className="App">

        <div className="unhomed-task-side">

            <h1>Unhomed Tasks</h1>

            <button onClick = {() => setShowForm(true)}>Add Task</button>

            { showForm && (
                <form onSubmit = {handleSubmit}>
                    <input
                        type = "text"
                        placeholder = "Task name"
                        value = {taskTitle}
                        onChange = {(e) => setTaskTitle(e.target.value)}
                    />

                    <input
                        type = "number"
                        placeholder = "Duration (minutes)"
                        value = {taskDuration}
                        onChange = {(e) => setTaskDuration(e.target.value)}
                    />

                    <button type="submit">Add Task</button>
                    <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </form>
            )}

            <div className="unhomed-tasks-container">
                {tasks.map((task, index) => (
                    <div key = {index}>
                        <h3>{task.title}</h3>
                        <p>{task.duration}</p>
                    </div>
                ))}
            </div>

        </div>


        <div className="schedule-side">
          <h1>Interactable Schedule</h1>
          <div className="schedule-container">

          </div>
        </div>

      </div>
  )
}

export default App