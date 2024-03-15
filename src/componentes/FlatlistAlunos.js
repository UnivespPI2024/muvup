import React from 'react';

const FlatListExample = () => {
  // Array de dados para a lista
  const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    // Adicione quantos itens desejar
  ];

  return (
    <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #ccc' }}>
      {/* Mapeando os dados e renderizando cada item */}
      {data.map(item => (
        <div key={item.id} style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default FlatListExample;