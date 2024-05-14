// Page4.jsx
import React from 'react';

function Page4({ name, orderId, setPage }) {
  return (
    <div className="page4-container">
      <h2>Hey {name}, your T-shirt is ready!</h2>
      <p>{orderId}</p>
      <button onClick={() => setPage(0)}>Back to start</button>
    </div>
  );
}

export default Page4;
