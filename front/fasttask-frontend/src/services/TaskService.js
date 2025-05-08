const API_URL = 'http://localhost:8080/task';


const getTasks = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/user/${userId}`);
        if (response.ok) {
            const tasks = await response.json();
            return tasks;  
        } else {
            throw new Error('Erro ao buscar tarefas');
        }
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        return [];  
    }
};


const createTask = async (task) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
            
        });

        if (response.ok) {
            const newTask = await response.json();
            return newTask;  
        } else {
            throw new Error('Erro ao criar tarefa');
        }
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        return null;  
    }
};

// Função para atualizar uma tarefa existente
const updateTask = async (id, task) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (response.ok) {
            const updatedTask = await response.json();
            return updatedTask;  
        } else {
            throw new Error('Erro ao atualizar tarefa');
        }
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        return null; 
    }
};

const deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return true;  // Retorna true se a tarefa for excluída com sucesso
        } else {
            throw new Error('Erro ao excluir tarefa');
        }
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
        return false;  // Retorna false em caso de erro
    }
};

const TaskService = {
    getTasks,   // Função para obter as tarefas
    createTask, // Função para criar uma nova tarefa
    updateTask, // Função para atualizar uma tarefa existente
    deleteTask, // Função para excluir uma tarefa
};

export default TaskService;
