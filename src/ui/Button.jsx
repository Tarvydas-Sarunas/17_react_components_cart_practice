import React from 'react';

export default function Button({
  children,
  type = 'button',
  className = '',
  onClick = () => {},
}) {
  return (
    <button
      className={
        'text-lg border px-6 py-2 border-slate-600 rounded-md hover:bg-indigo-600 hover:text-white transition-colors mt-6 place-self-start ' +
        className
      }
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
