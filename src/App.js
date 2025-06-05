import axios from "axios";
import {useEffect , useState} from "react";

function App() {
  return (
  <div>
    <h1>Add Task</h1>
    <AddTaskComponent/>
    <ViewTaskComponent/>
    
  </div>
  )
}


const AddTaskComponent = () => {
  const [task, setTask] = useState("")

  const handleChange = (e) => {
    setTask(e.target.value)
  }

  const handleClick = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/todos", {
        task: task
      })
      if (response.status === 201) {
        alert("Task Created")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <input onChange={handleChange} type="text" placeholder="Add task..." />
      <button onClick={handleClick}>Add Task</button>
    </div>
  )
}

const ViewTaskComponent = () => {
  const [task, setTask] = useState([])

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/todos")
      if (response.status === 200) {
        setTask(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTasks ()
  }, [task.length])
  return (
    <div>
      <h4>Tasks</h4>
      {Object.values(task).map((val, i) =><>
       <p key={i}>{val}</p>
       <button>Remove</button>
      </>)}
    </div>
  )
}

// const UpdateTaskComponent = () => {
//   return (
//     <div>
//       <input type="text" placeholder="Update Task" />
//       <button>Update Task</button>
//     </div>
//   )
// }

export default App;
