import React, { useState } from 'react';
import { PlusCircle, X, Check, ListFilter } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [sortCompleted, setSortCompleted] = useState(false);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortCompleted) {
      return Number(a.completed) - Number(b.completed);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Todo List
        </h1>

        <form onSubmit={addTodo} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <PlusCircle size={20} />
            Add
          </button>
        </form>

        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => setSortCompleted(!sortCompleted)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              sortCompleted
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ListFilter size={20} />
            {sortCompleted ? 'Show All' : 'Move Completed to Bottom'}
          </button>
          <span className="text-sm text-gray-600">
            {todos.filter(t => !t.completed).length} remaining
          </span>
        </div>

        <div className="space-y-3">
          {sortedTodos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  todo.completed
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300 hover:border-green-500'
                }`}
              >
                {todo.completed && <Check size={14} className="text-white" />}
              </button>
              <span
                className={`flex-1 ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No todos yet. Add some tasks to get started!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;