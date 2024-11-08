import React from 'react';

const Categories = () => {
  const categories = [
    { name: 'Café Arábica', image: 'path/to/category1.jpg' },
    { name: 'Café Robusta', image: 'path/to/category2.jpg' },
    { name: 'Accesorios', image: 'path/to/category3.jpg' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      {categories.map((category, index) => (
        <div key={index} style={{ textAlign: 'center', width: '200px' }}>
          <img src={category.image} alt={category.name} style={{ width: '100%', borderRadius: '8px' }} />
          <h3>{category.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Categories;