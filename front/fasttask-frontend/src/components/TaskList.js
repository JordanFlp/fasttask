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

  // Carrega as tarefas do usuário
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

  // Filtrar tarefas pelo status
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
          <div key={task.id} className="task-card">
            <h3>{task.name}</h3>
            <p><strong>Descrição:</strong> {task.description || '—'}</p>
            <p>
              <strong>Status:</strong>{' '}
              <button className="status-button" onClick={() => toggleTaskStatus(task)}>
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

            <div className="task-buttons">
              <button onClick={() => handleEdit(task)}>Editar</button>
              <button onClick={() => handleDelete(task.id)}>Excluir</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
