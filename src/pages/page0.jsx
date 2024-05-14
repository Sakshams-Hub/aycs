// Page0.jsx
import React from 'react';
import '../Style/page0.css';

function Page0({ setPage }) {
  return (
    <div className="page0-container">
      <div className="centered">
        <button className="button0" onClick={() => setPage(1)}>Start</button>
      </div>
    </div>
  );
}

export default Page0;
