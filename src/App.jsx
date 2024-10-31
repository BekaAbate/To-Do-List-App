import Card from './components/Card'
import './App.css'
import toDoIcon from './assets/img/toDoIcon.png'
import { useEffect, useState } from 'react'
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [desc, setDesc] = useState('');
  useEffect(() => {
    const tasksData = localStorage.getItem('tasks');
    if (tasksData) setTasks(JSON.parse(tasksData));
    else setTasks([]);
  }, [])
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])
  function addTask() {
    const newTask = {
      id: crypto.randomUUID(),
      description: desc,
      completed: false
    }

    setTasks((prevTasks) => {
      if (desc === '') return prevTasks
      return [...prevTasks, newTask]
    })
    setDesc('');
  }

  function handleChange(event) {
    setDesc(() => {
      return event.target.value
    })
  }
  function handleComplete(id) {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed }
        }
        return task
      })
    })
  }
  function handleDelete(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const tasksElements = tasks.map((task) => {
    return <Card
      key={task.id}
      id={task.id}
      desc={task.description}
      handleComplete={handleComplete}
      handleDelete={handleDelete}
      completed={task.completed}
    />
  })
  return (

    <main>
      <div className='header'>
        <h1>TO-DO List</h1>
        <img src={toDoIcon} alt="" />
      </div>
      <label className='input-todo'>
        <input
          type="text"
          placeholder='Add your task'
          name='desc'
          onChange={handleChange}
          value={desc}
        />
        <button className='add-to-do-item' onClick={addTask}>Add</button>
      </label>
      {tasksElements}
    </main>
  )
}