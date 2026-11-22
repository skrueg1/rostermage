import { useState } from 'react'
import './App.css'

function App() {

  const [unhomedTasks, setUnhomedTasks] = useState([]);
  const [tasksOnSchedule, setTasksOnSchedule] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDuration, setTaskDuration] = useState("");

  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("20:00");
  const validTimeRange = startTime < endTime;
  const startTimeInMinutes = Number(startTime.split(":")[0]) * 60 + Number(startTime.split(":")[1]);
  const endTimeInMinutes = Number(endTime.split(":")[0]) * 60 + Number(endTime.split(":")[1]);
  const availableMinutes = endTimeInMinutes - startTimeInMinutes;

  const hours = [];
  for (let time = startTimeInMinutes; time <= endTimeInMinutes; time += 60) {
      hours.push(time);
  }

    function handleSubmit(e) {
      e.preventDefault();

      const newTask = {
          id: crypto.randomUUID(),
          title: taskTitle.trim(),
          duration: Number(taskDuration),
          startTime: null
      };

      setUnhomedTasks((currentTasks) => [...currentTasks, newTask]);

      setTaskTitle("");
      setTaskDuration("");
      setShowForm(false);
  }

  function deleteTask(index){
      setUnhomedTasks(unhomedTasks.filter((task, i) => i !== index));
  }

  function handleDrop(e) {
      e.preventDefault();

      const taskID = e.dataTransfer.getData("taskID");

      const dropPosition = e.nativeEvent.offsetY;
      const minutesFromStart = Math.floor(dropPosition);
      const taskStartTime = startTimeInMinutes + minutesFromStart;

      const taskToSchedule = unhomedTasks.find((task) => task.id === taskID);

      if (taskToSchedule) {
          setTasksOnSchedule((currentTasks) => [
              ...currentTasks,
              {...taskToSchedule, startTime: taskStartTime}
          ]);
          setUnhomedTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskID));
      }
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

                {unhomedTasks.map((task, index) => (
                    <div
                        className = "task-item"
                        key = {task.id}
                        draggable = {true}
                        onDragStart = {(e) => e.dataTransfer.setData("taskID", task.id)}
                    >
                        <h3>{task.title}</h3>
                        <p>{task.duration}</p>
                        <button onClick={() => deleteTask(index)}>Delete</button>
                    </div>
                ))}

            </div>

        </div>


        <div className="schedule-side">
            <h1>Interactable Schedule</h1>

            <label>
                Start time:
                <input
                    type = "time"
                    value = {startTime}
                    onChange = {(e) => setStartTime(e.target.value)}
                />
            </label>

            <label>
                End time:
                <input
                    type = "time"
                    value = {endTime}
                    onChange = {(e) => setEndTime(e.target.value)}
                />
            </label>

            {!validTimeRange && (
                <p>End time must be later than start time.</p>
            )}
            {validTimeRange && (
                <p>Available amount of time: {availableMinutes / 60} hours.</p>
            )}

            <button onClick = {() => {
                setStartTime("08:00");
                setEndTime("20:00");
            }}>
                Reset
            </button>

            <div className = "schedule-container">

                <div className = "time-column">

                    {hours.map((time) => (
                        <div className = "hour-slot" key = {time}>
                            {String(Math.floor(time/60)).padStart(2, "0")}:00
                        </div>
                    ))}

                </div>

                <div
                    className = "task-column"
                    onDragOver = {(e) => e.preventDefault()}
                    onDrop = {handleDrop}
                >

                    {tasksOnSchedule.map((task) => (
                        <div
                            className = "task-item"
                            key = {task.id}
                            style = {{
                                position: "absolute",
                                top: `${task.startTime - startTimeInMinutes}px`,
                                height: `${task.duration}px`,
                                left: "5px",
                                right: "5px"
                            }}
                        >
                            <h3>{task.title}</h3>
                            <p>{task.duration} minutes</p>
                        </div>
                    ))}

                </div>

            </div>

        </div>

      </div>
  )
}

export default App