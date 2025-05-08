import React, { useEffect, useState, useCallback } from 'react';
import TaskService from '../services/TaskService';
import TaskForm from './TaskForm';

const TaskList = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadTasks = useCallback(async () => {
    if (!userId) {
      console.error("User ID não está disponível");
      return;
    }

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

  useEffect(() => {
    console.log("User ID no useEffect:", userId);
    if (userId) {
      loadTasks();
    } else {
      console.error("User ID não está disponível");
    }
  }, [userId, loadTasks]);

  return (
    <div>
      <h2>Minhas Tarefas</h2>
      <button onClick={handleCreateClick}>+ Nova Tarefa</button>

      {showForm && (
        <TaskForm
          task={editingTask}
          userId={userId}
          onSuccess={handleFormSuccess}
        />
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.name}</strong> - {task.status} - {task.priority}
            {task.subitems && task.subitems.length > 0 && (
              <ul>
                {task.subitems.map((subitem, index) => (
                  <li key={index}>
                    {subitem.description} - {subitem.active ? 'Ativo' : 'Inativo'}
                  </li>
                ))}
              </ul>
            )}
            <div>
              <button onClick={() => handleEdit(task)}>Editar</button>
              <button onClick={() => handleDelete(task.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
