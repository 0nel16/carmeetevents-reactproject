import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;
const endpoint = `${apiUrl}/todos`;

function processServerResponse(res) {
  if (!res.ok) {
    if (res.status === 404) {
      console.warn('Resource not found!');
    }

    if (res.status === 401) {
      console.warn('Please log in');
    }

    throw new Error('HTTP request error!');
  }
  return res.json();
}

export function TodoList() {
  const [todos, setTodos] = useState(null);

  // READ/RETRIEVE
  useEffect(() => {
    fetch(endpoint)
      .then(processServerResponse)
      .then((data) => setTodos(data))
      .catch(console.warn);
  }, []);

  // if(!todos) {
  //   return <strong>Loading ...</strong>;
  // }

  // let toDisplay = [];
  // if (Array.isArray(todos)) {
  //   //   for(const todo of todos) {
  //   //     toDisplay.push(
  //   //       <li key={todo.id}>
  //   //         <label>
  //   //           <input type="checkbox" /> {todo.title}
  //   //         </label>
  //   //       </li>
  //   //     );
  //   //   }

  //   toDisplay = todos.map((todo) => (
  //     <li key={todo.id}>
  //       <label>
  //         <input type="checkbox" /> {todo.title}
  //       </label>
  //     </li>
  //   ));
  // }

  // CREATE
  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const todoTitle = formData.get('title');

    try {
      const newTodo = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          title: todoTitle,
          completed: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(processServerResponse);

      const newTodoList = [...todos, newTodo];
      setTodos(newTodoList);
      form.reset();
    } catch (e) {
      console.warn(e);
    }
  }

  // DELETE
  async function handleDeleteTodo(todo) {
    // console.log(e.target.dataset.todoId);
    // console.log(todo.id);

    await fetch(`${endpoint}/${todo.id}`, { method: 'DELETE' });

    const newTodoList = todos.filter((t) => t !== todo);
    setTodos(newTodoList);
  }

  // UPDATE
  async function handleCompleteTodo(todo) {
    const updatedTodo = await fetch(`${endpoint}/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed: !todo.completed,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(processServerResponse);

    const indexOfOldTodo = todos.findIndex((t) => t === todo);
    const newTodoList = todos.toSpliced(indexOfOldTodo, 1, updatedTodo);

    setTodos(newTodoList);
  }

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">What do you want to do?</label>{' '}
        <input type="text" id="title" name="title" />
        <button type="submit">Add</button>
      </form>
      {!todos && <strong>Loading ...</strong>}
      {todos && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCompleteTodo(todo)}
                />{' '}
                {todo.title}
              </label>{' '}
              <button
                type="button"
                data-todo-id={todo.id}
                onClick={() => handleDeleteTodo(todo)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// RESTful Web Api/Service (REpresentational State Transfer)
// Resources:
//    users, todos
// Entity:
//     1 user, 1 todo, (id) (resource)
// Endpoint:
// http://localhost:3000/todos/:id

// Request (CRUD)
// GET    /todos   -> List of all todos
// GET    /todos/1 -> The todo with an ID of 1
// POST   /todos   -> Creates a new todo with the data form the request body
// PUT    /todos/1 -> Replaces the todo at the ID of 1 with the data in the request body
// PATCH  /todos/1 -> Updates the todo at the ID of 1 with the partial data from the body
// DELETE /todos/1 -> Deletes the todo with an ID of 1

// Create        -> POST
// Read/Retrieve -> GET
// Update        -> PUT/PATCH
// Delete        -> DELETE

// Response
// 200 - OK
// 201 - Created (as a response to POST) -> Response contains the entity that was created

// 3XX - Redirects

// 4XX - Client Errors
// 400 - Bad Request
// 401 - Unauthorized
// 403 - Not Allowed
// -
// 405 - Method Not Allowed
// 418 - I'm a teapot

// 5XX - Server Errors
// 500 - Internal Server Error
// 502 - Bad Gateway
