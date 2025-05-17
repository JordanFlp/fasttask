import React, { useEffect, useState, useCallback } from 'react';
import TaskService from '../services/TaskService';
import TaskForm from './TaskForm';
import axios from 'axios';

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
      loadTasks();
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

      // Atualiza a lista de tarefas após alteração
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
    if (filter === 'active') return task.status !== 'CONCLUÍDA';
    if (filter === 'completed') return task.status === 'CONCLUÍDA';
    return true;
  });

  return (
    <div>
      <h2>Minhas Tarefas</h2>
      <button onClick={handleCreateClick}>+ Nova Tarefa</button>

      <div style={{ margin: '10px 0' }}>
        <strong>Filtrar:</strong>{' '}
        <button onClick={() => setFilter('all')}>Todas</button>{' '}
        <button onClick={() => setFilter('active')}>Ativas</button>{' '}
        <button onClick={() => setFilter('completed')}>Concluídas</button>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          userId={userId}
          onSuccess={handleFormSuccess}
        />
      )}

      {filteredTasks.length === 0 ? (
        <p>Nenhuma tarefa encontrada com esse filtro.</p>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              margin: '10px 0',
              borderRadius: '8px',
            }}
          >
            <h3>{task.name}</h3>
            <p><strong>Descrição:</strong> {task.description || '—'}</p>
            <p>
                <strong>Status:</strong>{' '}
                <button onClick={() => toggleTaskStatus(task)}>
                  {task.status === 'Concluída'
                    ? '✅ Concluída'
                    : task.status === 'Em andamento'
                    ? '🚧 Em andamento'
                    : '🕒 A fazer'}
                </button>
              </p>
            <p><strong>Prioridade:</strong> {task.priority}</p>

            {task.subitems && task.subitems.length > 0 && (
              <div>
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

            <div style={{ marginTop: '10px' }}>
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
