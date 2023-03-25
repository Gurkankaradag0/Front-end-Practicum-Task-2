import { useState } from "react"
import { useImmer } from "use-immer"

const TodoApp = () => {
    //  states
    //      todos: state that stores the list of todos
    //      todo: state that stores the input value
    //      filter: state that stores the 'All', 'Active', and 'Completed' filters
    const [todos, setTodos] = useImmer([])
    const [todo, setTodo] = useState('')
    const [filter, setFilter] = useState('All')

    // filters
    const filters = ["All", "Active", "Completed"]

    //  form submit handle
    //      When the form is submitted (by pressing enter), preventDefault() method is called to prevent the page from refreshing.
    //      If there is a todo, it is added to the todos using the setTodos() state.
    //      The input value is cleared using setTodo('') state.
    const onSubmitHandle = (e) => {
        e.preventDefault()
        todo && setTodos([...todos, {title: todo, completed: false}])
        setTodo('')
    }

    // 'Mark all as complete' handle
    //      All todos are retrieved and the completed value of each todo is set to true.
    const markAllAsComplete = () => {
        todos.forEach((todo, key) => {
            setTodos(todos => {todos[key].completed = true})
        })
    }

    return (
        <section className="todoapp">
            <section className="header">
                <h1>todos</h1>
                <form onSubmit={onSubmitHandle}>
                    <input 
                        className="new-todo" 
                        placeholder="What needs to be done?" 
                        autoFocus
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                </form>
            </section>

            <section className="main">
                <input className="toggle-all" type="checkbox" />
                <label onClick={markAllAsComplete}> Mark all as complete </label>

                <ul className="todo-list">
                    {
                        todos.map((todo, key) => {
                            //  Todos are filtered based on the selected filter.
                            //  If filter === 'All', all todos are listed.
                            //  If filter === 'Active', todos with a completed value of false are listed.
                            //  If filter === 'Completed', todos with a completed value of true are listed.
                            if (filter === "All" || 
                                (filter === "Active" && todo.completed === false) ||
                                (filter === "Completed" && todo.completed === true)) {
                                    return (
                                        <li key={key} className={todo.completed ? "completed" : ""}>
                                            <div className="view">
                                                <input 
                                                    className="toggle" 
                                                    type="checkbox"
                                                    checked={todo.completed}
                                                    onChange={() => setTodos(todos => {todos[key].completed = !todos[key].completed})}
                                                />
                                                <label>{todo.title}</label>
                                                <button 
                                                    className="destroy"
                                                    onClick={() => setTodos(todos.filter((todo, id) => id !== key))}
                                                ></button>
                                            </div>
                                        </li>
                                    )
                                }
                            else return false
                        })
                    }
                </ul>
            </section>

            <footer className="footer">
                <span className="todo-count">
                    <strong>
                        {
                            //  Todos are filtered and the count of todos whose completed value is not true is returned.
                            todos.filter(todo => todo.completed === false).length
                        }
                    </strong>
                    {` `}items left
                </span>

                <ul className="filters">
                    {
                        //  Filters are mapped and when clicked, setFilter state and their classes are updated.
                        filters.map((item, key) => (
                            <li key={key}>
                                <a
                                    href="#/"
                                    className={filter === item ? 'selected': ''}
                                    onClick={() => setFilter(item)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))
                    }
                </ul>

                <button 
                    className="clear-completed"
                    onClick={() => {
                        //  It filters all completed todos and updates the setTodo() state.
                        setTodos(todos.filter(todo => todo.completed !== true))
                    }}
                >
                    Clear completed
                </button>
            </footer>
        </section>
    )
}

export default TodoApp