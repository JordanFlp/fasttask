import React from 'react';

const SubitemList = ({ subitems, setSubitems }) => {
  // Adiciona um novo subitem vazio (com nomes de propriedades consistentes)
  const handleAdd = () => {
    setSubitems([...subitems, { description: '', active: false }]);
  };

  // Atualiza a descrição do subitem no índice passado
  const handleChange = (index, value) => {
    const updated = [...subitems];
    updated[index] = { ...updated[index], description: value };
    setSubitems(updated);
  };

  // Remove o subitem no índice passado
  const handleRemove = (index) => {
    const updated = [...subitems];
    updated.splice(index, 1);
    setSubitems(updated);
  };

  // Alterna o booleano active do subitem no índice passado
  const handleToggle = (index) => {
    const updated = [...subitems];
    updated[index] = { ...updated[index], active: !updated[index].active };
    setSubitems(updated);
  };

  return (
    <div>
      <h4>Subitens</h4>
      {subitems.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={item.active}
            onChange={() => handleToggle(index)}
          />
          <input
            type="text"
            value={item.description}
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
