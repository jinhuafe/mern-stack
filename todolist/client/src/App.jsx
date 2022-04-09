import { useState ,useEffect} from 'react'
import './App.css'

const API_BASE = "http://localhost:5000/api"

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(()=>{
    fetch(API_BASE + '/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.err(err))
  },[])

  //Change done / undone
  const doneTodo = async(id) => {
    const data = await fetch(API_BASE + '/todo/done/' + id)
      .then(res => res.json())

    const res = todos.map( x => {
      if(x._id === data._id) {
        x.done = data.done
      }
      return x
    })

    setTodos(res)
  }

  // Delete
  const deleteTodo = async(id) => {
    const data = await fetch(API_BASE + '/todo/delete/' + id, {
      method: "DELETE"
    }).then(res => res.json())

    setTodos(todos.filter(x => x._id !== data._id))
  }

  //Add
  const handleSubmit =async (e) => {
    e.preventDefault()

    let newTodos = todos
    if(newTodo) {
      const data = await fetch(API_BASE + '/todo/add/',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name:  newTodo
          })
      }).then(res => res.json())

      newTodos = ([...todos, data])
    }
    // setTodos([...todos, data])
    setTodos(newTodos)
    setNewTodo('')
  } 
  
  return (
    <div className="container">
      <h1>备忘录</h1>

      <form 
        className="input-area-wrapper"
        onSubmit={e =>handleSubmit(e)}
      >
        <input 
          className="input-area"
          type="text" 
          placeholder="记录什么..." 
          value={newTodo}
          onChange={e=>setNewTodo(e.target.value)}
        />
        <button className="btn-submit" type="submit">添加</button>
      </form>

        <ul className="todo-wrapper">
         {
           todos.map(todo => (
             <li key={todo._id}  
                  className="todo-list"
              >
               <input
                  className="btn-checkbox" 
                  onClick= {()=>{doneTodo(todo._id)}}   
                  defaultChecked = {todo.done} 
                  type="checkbox" 
                />
               <div id="todo-text" className={todo.done ? "todo-done" : "todo-undone"}>{todo.name}</div>
               <button 
                  className="btn-delete"
                  onClick={()=>deleteTodo(todo._id)}
                >x</button>
             </li>
           ))
         } 
        </ul>
      
    </div>
    )
}

export default App
