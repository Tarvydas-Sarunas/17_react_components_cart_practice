import React from 'react';

export default function ShopListItem({ item }) {
  return (
    <div>
      <img src={item.thumbnail} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.price}</p>
      <p>Category: {item.category}</p>
    </div>
  );
}
