import React from 'react';
import TaskList from '../components/TaskList';


const DashboardPage = ({ user }) => {
  return (
    <div>
      <h2>Bem-vindo, {user.name}!</h2>
      <TaskList userId={user.id} />
    </div>
  );
};

export default DashboardPage;
