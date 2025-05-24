import React, { useEffect, useState, useCallback } from 'react';
import TaskService from '../services/TaskService';
import TaskForm from './TaskForm';
import axios from 'axios';
import '../styles/TaskList.css';

const TaskList = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  const loadTasks = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await TaskService.getTasks(userId);
      setTasks(response);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  }, [userId]);

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await TaskService.deleteTask(taskId);
      await loadTasks();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const handleCreateClick = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingTask(null);
    loadTasks();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const toggleTaskStatus = async (task) => {
    const statusCycle = {
      'A fazer': 'Em andamento',
      'Em andamento': 'Concluída',
      'Concluída': 'A fazer',
    };

    const newStatus = statusCycle[task.status] || 'A fazer';

    const updatedTask = {
      id: task.id,
      name: task.name,
      description: task.description,
      status: newStatus,
      priority: task.priority,
      user: { id: userId },
      subitems: task.subitems?.map((subitem) => ({
        id: subitem.id,
        description: subitem.description,
        active: subitem.active,
      })) || [],
    };

    try {
      await TaskService.updateTask(task.id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, status: newStatus } : t
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error);
    }
  };

  const toggleSubitem = async (taskId, subitem) => {
    try {
      const updatedPayload = {
        id: subitem.id,
        description: subitem.description,
        active: !subitem.active,
        task: { id: taskId },
      };
      await axios.put(
        `http://localhost:8080/subitem/${subitem.id}`,
        updatedPayload
      );
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subitems: task.subitems.map((s) =>
                  s.id === subitem.id ? { ...s, active: updatedPayload.active } : s
                ),
              }
            : task
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar subitem:', error);
    }
  };

  useEffect(() => {
    if (userId) loadTasks();
  }, [userId, loadTasks]);

  const filteredTasks = tasks.filter((task) => {
    const statusLower = task.status.toLowerCase();
    if (filter === 'active') return statusLower !== 'concluída';
    if (filter === 'completed') return statusLower === 'concluída';
    return true;
  });

  return (
    <div className="tasklist-container">
      <div className="tasklist-header">
        <h2>Minhas Tarefas</h2>
        <button onClick={handleCreateClick}>Nova Tarefa</button>
      </div>

      <div className="tasklist-filter">
        <strong>Filtrar:</strong>
        <button onClick={() => setFilter('all')}>Todas</button>
        <button onClick={() => setFilter('active')}>Ativas</button>
        <button onClick={() => setFilter('completed')}>Concluídas</button>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          userId={userId}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {filteredTasks.length === 0 ? (
        <p>Nenhuma tarefa encontrada com esse filtro.</p>
      ) : (
        filteredTasks.map((task) => (
          <div 
            key={task.id} 
            className="task-card"
            data-priority={task.priority.toLowerCase()}
          >
            <div className="task-content">
              <h3>{task.name}</h3>
              <p><strong>Descrição:</strong> {task.description || '—'}</p>
              <p>
                <strong>Status:</strong>{' '}
                <button 
                  className="status-button" 
                  onClick={() => toggleTaskStatus(task)}
                  data-status={task.status}
                >
                  {task.status === 'Concluída'
                    ? '✅ Concluída'
                    : task.status === 'Em andamento'
                    ? '🚧 Em andamento'
                    : '🕒 A fazer'}
                </button>
              </p>
              <p><strong>Prioridade:</strong> {task.priority}</p>

              {task.subitems?.length > 0 && (
                <div className="task-subitems">
                  <strong>Subitens:</strong>
                  <ul>
                    {task.subitems.map((subitem) => (
                      <li key={subitem.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={!subitem.active}
                            onChange={() => toggleSubitem(task.id, subitem)}
                          />{' '}
                          <span
                            style={{
                              textDecoration: !subitem.active ? 'line-through' : 'none',
                            }}
                          >
                            {subitem.description}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="task-actions">
              <button 
                className="edit-btn" 
                onClick={() => handleEdit(task)} 
                title="Editar"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              
              <button 
                className="delete-btn" 
                onClick={() => handleDelete(task.id)} 
                title="Excluir"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;