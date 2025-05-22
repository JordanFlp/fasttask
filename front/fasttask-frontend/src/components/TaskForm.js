import React, { useState, useEffect } from 'react';
import TaskService from '../services/TaskService';

const TaskForm = ({ task, userId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'A fazer',
    priority: 'Baixa',
    subitems: [],
  });

  // Estado para controlar a animação de saída
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name,
        description: task.description,
        status: task.status,
        priority: task.priority,
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

    const validSubitems = formData.subitems.filter(subitem => subitem.description.trim() !== '');

    const taskPayload = {
      ...task,
      ...formData,
      user: { id: userId },
      subitems: validSubitems.map(subitem => ({
        description: subitem.description,
        active: true,
      })),
    };

    try {
      if (task && task.id) {
        await TaskService.updateTask(task.id, taskPayload);
      } else {
        await TaskService.createTask(taskPayload);
      }

      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

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

  // Função para animar o fechamento e depois chamar onCancel
  const handleCancelClick = () => {
    setIsClosing(true); // inicia animação

    setTimeout(() => {
      onCancel();
      setIsClosing(false); // reseta para caso reabra o form
    }, 300); // duração da animação em ms (deve bater com o CSS)
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        opacity: isClosing ? 0 : 1,
        transition: 'opacity 300ms ease',
      }}
    >
      <h3>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</h3>

      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Descrição"
        value={formData.description}
        onChange={handleChange}
      />

      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="A fazer">A fazer</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Concluída">Concluída</option>
      </select>

      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="Baixa">Baixa</option>
        <option value="Média">Média</option>
        <option value="Alta">Alta</option>
      </select>

      <h4>Subitens</h4>
      {formData.subitems.map((subitem, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Subitem ${index + 1}`}
            value={subitem.description}
            onChange={(e) => handleSubitemChange(index, e.target.value)}
          />
          <button type="button" onClick={() => handleRemoveSubitem(index)}>Remover</button>
        </div>
      ))}
      <button type="button" onClick={handleAddSubitem}>+ Adicionar Subitem</button>

      <div style={{ marginTop: '1rem' }}>
        <button type="submit">{task ? 'Salvar Alterações' : 'Criar Tarefa'}</button>
        <button type="button" onClick={handleCancelClick} style={{ marginLeft: '1rem' }}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
