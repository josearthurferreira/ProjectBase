import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { api } from './services/api';
import './App.css';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get<Task[]>('/tasks/');
        setTasks(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Erro ao buscar tarefas:', axiosError);
        alert(`Erro ao conectar com a API. Detalhes: ${axiosError.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const response = await api.post<Task>('/tasks/', {
        title: newTaskTitle,
        completed: false,
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTaskTitle('');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const handleToggleTask = async (task: Task) => {
    try {
      const response = await api.put<Task>(`/tasks/${task.id}`, {
        title: task.title,
        completed: !task.completed,
      });
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? response.data : t)));
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Gerenciador de Tarefas</h2>
      
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="O que você precisa fazer?"
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Adicionar
        </button>
      </form>

      {loading ? (
        <p>Carregando tarefas...</p>
      ) : tasks.length === 0 ? (
        <p>Nenhuma tarefa pendente. Você está livre! 🎉</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <li 
              key={task.id}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '12px',
                borderBottom: '1px solid #eee',
                backgroundColor: task.completed ? '#f9f9f9' : 'transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ 
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#888' : '#000'
                }}>
                  {task.title}
                </span>
              </div>
              <button 
                onClick={() => handleDeleteTask(task.id)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'red', 
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;