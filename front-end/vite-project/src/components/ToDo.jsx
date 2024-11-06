import React, { useState } from 'react';

export default function ToDo() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    return (
        <div>
            <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder='Ajouter une tâche'
            />
            <button
                onClick={() => {
                    setTodos([...todos, todo]);
                    setTodo('');
                }}
                disabled={!todo}
            >
                Ajouter
            </button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
        </div>
    );
}