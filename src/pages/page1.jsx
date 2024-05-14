// Page1.jsx
import React, { useState } from 'react';
import '../Style/page1.css';

function Page1({ setPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [size, setSize] = useState('');

  const handleStart = () => {
    if (!name || !email || !size) {
      alert('Please fill out all fields');
      return;
    }
    setPage(2);
  };

  return (
    <div className="page1-container">
      <h2>Enter Your Details</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div className="size-checkboxes">
        <label>
          <input type="checkbox" value="S" checked={size === "S"} onChange={() => setSize("S")} />
          <span>S</span>
        </label>
        <label>
          <input type="checkbox" value="M" checked={size === "M"} onChange={() => setSize("M")} />
          <span>M</span>
        </label>
        <label>
          <input type="checkbox" value="L" checked={size === "L"} onChange={() => setSize("L")} />
          <span>L</span>
        </label>
        <label>
          <input type="checkbox" value="XL" checked={size === "XL"} onChange={() => setSize("XL")} />
          <span>XL</span>
        </label>
      </div>
      <button onClick={handleStart}>Next</button>
    </div>
  );
}

export default Page1;
