
import React from 'react';

const SubitemList = ({ subitems, setSubitems }) => {
  const handleAdd = () => {
    setSubitems([...subitems, { name: '', completed: false }]);
  };

  const handleChange = (index, value) => {
    const updated = [...subitems];
    updated[index].name = value;
    setSubitems(updated);
  };

  const handleRemove = (index) => {
    const updated = [...subitems];
    updated.splice(index, 1);
    setSubitems(updated);
  };

  const handleToggle = (index) => {
    const updated = [...subitems];
    updated[index].completed = !updated[index].completed;
    setSubitems(updated);
  };

  return (
    <div>
      <h4>Subitens</h4>
      {subitems.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => handleToggle(index)}
          />
          <input
            type="text"
            value={item.name}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <button type="button" onClick={() => handleRemove(index)}>Remover</button>
        </div>
      ))}
      <button type="button" onClick={handleAdd}>+ Subitem</button>
    </div>
  );
};

export default SubitemList;
