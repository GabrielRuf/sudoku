import React from 'react';

function Cell({ value, onChange, onDoubleClick, isFixed }) {
  return (
    <input
      type="text"
      className={`cell ${isFixed ? 'fixed' : ''}`}
      value={value}
      onChange={onChange}
      onDoubleClick={onDoubleClick}
      maxLength="1"
      disabled={isFixed}
    />
  );
}

export default Cell;
