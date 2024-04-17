import React from 'react';
import './scss/content/App.scss';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { TodosLoading } from './todosLoading'
import imageSVG from './asset/img/undraw.svg';

// const TodosDefault = [
//   { text: 'Llorar con la Llorona', completed: false },
//   { text: 'Cortar Cebolla', completed: false },
//   { text: 'Votar la basura', completed: false },
//   { text: 'Ir  a trabajar', completed: false },
//   { text: 'Conseguir un trabajo como programador', completed: false },
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(TodosDefault));
// localStorage.removeItem('TODOS_V1');

function useLocarStorage(itemName, initialValue) {

  const [item, setItem] = React.useState(initialValue);

  const [loading, setLoading] = React.useState(true);

  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
          setItem(parsedItem);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }

    }, 4000);
  }, []);

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem))
    setItem(newItem)
  }

  return {
    item,
    saveItem,
    loading,
    error,
  };

}

function App() {

  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,

  } = useLocarStorage('TODOS_V1', []);
  const [getTaskValue, setGetTaskValue] = React.useState('');
  const [filterTodo, setFilterTodos] = React.useState('');
  const todosCompleted = todos.filter(todo => !!todo.completed).length;
  const todosTotal = todos.length;

  let newTodo = [...todos];

  const searchedTodos = todos.filter(
    (todo) => {
      return todo.text.toLowerCase().includes(filterTodo.toLowerCase())
    }
  )
  const addTodo = (text) => {
    const newTodo = [...todos];
    console.log(text)
    newTodo.push({
      text,
      completed: false,
    });

    saveTodos(newTodo);
  }

  const onChange = (event) => {
    setGetTaskValue(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    addTodo(getTaskValue)
    setGetTaskValue('')
    event.reset();

  }

  const completeTodo = (text) => {
    newTodo = [...todos];
    const todoIndex = newTodo.findIndex((todo) => todo.text === text);
    newTodo[todoIndex].completed = true
    saveTodos(newTodo)
  }

  const deleteTodo = (text) => {
    newTodo = [...todos];
    const todoIndex = newTodo.findIndex((todo) => todo.text === text);
    newTodo.splice(todoIndex, 1)
    saveTodos(newTodo)
  }









  return (
    <>
      <div className='todo-container'>
        <div className='todo-content'>

          <section className='create-task-section'>
            <div className='create-task-container'>
              <div className='create-task'>
                <h2>Create you new task</h2>
                <div className='create-task-content'>

                  <form onSubmit={onSubmit}>

                    <label>
                      <input type="text" placeholder="What do you want to do ?"
                        value={getTaskValue}
                        onChange={onChange}
                        required
                        reset
                      />
                    </label>

                    <button className='btn'
                      type="submit"
                    >
                      Create task
                    </button>
                  </form>
                </div>

              </div>

              <div className='image-task'>
                <img src={imageSVG} alt='svg' />
              </div>
            </div>
          </section>

          <section className='tasks-created-section'>
            <div className='tasks-created-section-contaniner'>
              <TodoCounter total={todosTotal} completed={todosCompleted} />
              <div className='tasks-created-section-content'>
                <div className='tasks-created'>
                  <TodoSearch filterTodo={filterTodo} setFilterTodos={setFilterTodos} />

                  <TodoList>
                    {loading && <TodosLoading />}
                    {error && <p>We have an error we are going to fix as soon as possible</p>}
                    {(!loading && searchedTodos.length === 0) && <p className='empty-task'><span>!Create</span> your first Todo</p>}
                    {searchedTodos.map(todo => (
                      <TodoItem key={todo.text}
                        text={todo.text}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo.text)}
                        onDelete={() => deleteTodo(todo.text)}
                      />
                    ))}
                  </TodoList>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

    </>
  );
}



export default App;
