import React, { useState, useEffect } from 'react';
import TaskService from '../services/TaskService';
import '../styles/TaskForm.css';

const TaskForm = ({ task, userId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'A fazer',
    priority: 'Baixa',
    subitems: [],
  });

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority, // Mantém a capitalização original
        subitems: task.subitems || [],
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskPayload = {
      ...formData,
      user: { id: userId },
      subitems: formData.subitems
        .filter(subitem => subitem.description.trim() !== '')
        .map(subitem => ({
          id: subitem.id || null, // Mantém o ID se existir
          description: subitem.description,
          active: subitem.active !== false, // Default true
        })),
    };

    try {
      if (task && task.id) {
        // Para edição, mantemos a estrutura original
        const updatedTask = {
          id: task.id,
          name: formData.name,
          description: formData.description,
          status: formData.status,
          priority: formData.priority, // Mantém a capitalização
          user: { id: userId },
          subitems: taskPayload.subitems
        };
        await TaskService.updateTask(task.id, updatedTask);
      } else {
        await TaskService.createTask(taskPayload);
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  // Restante do código permanece igual ao original
  const handleAddSubitem = () => {
    setFormData(prev => ({
      ...prev,
      subitems: [...prev.subitems, { description: '' }],
    }));
  };

  const handleSubitemChange = (index, value) => {
    const updated = [...formData.subitems];
    updated[index].description = value;
    setFormData(prev => ({ ...prev, subitems: updated }));
  };

  const handleRemoveSubitem = (index) => {
    const updated = formData.subitems.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, subitems: updated }));
  };

  const handleCancelClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      onCancel();
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className={`task-form-overlay ${isClosing ? 'closing' : ''}`}>
      <div className="task-form-container">
        <form onSubmit={handleSubmit} className="task-form">
          <h3>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</h3>

          <div className="form-group">
            <label>Nome*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                className="status-select"
              >
                <option value="A fazer">A fazer</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluída">Concluída</option>
              </select>
            </div>

            <div className="form-group">
              <label>Prioridade</label>
              <select 
                name="priority" 
                value={formData.priority} 
                onChange={handleChange}
                className={`priority-select ${formData.priority.toLowerCase()}`}
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>

          <div className="subitems-container">
            <label>Subitens</label>
            {formData.subitems.map((subitem, index) => (
              <div key={index} className="subitem">
                <input
                  type="text"
                  placeholder={`Subitem ${index + 1}`}
                  value={subitem.description}
                  onChange={(e) => handleSubitemChange(index, e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={() => handleRemoveSubitem(index)}
                  className="remove-subitem-btn"
                >
                  ×
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={handleAddSubitem}
              className="add-subitem-btn"
            >
              + Adicionar Subitem
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {task ? 'Salvar Alterações' : 'Criar Tarefa'}
            </button>
            <button 
              type="button" 
              onClick={handleCancelClick}
              className="cancel-btn"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;