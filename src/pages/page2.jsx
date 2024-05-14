// Page2.jsx
import React from 'react';
import '../Style/page2.css';
import tshirt from '../data/tshirt';

function Page2({ setPage, handleTshirtSelection }) {
  return (
    <div className="page2-container">
      <h2>Select a T-shirt</h2>
      <div className="tshirt-cards-container">
        {tshirt.map((tshirt) => (
          <div className="tshirt-card" key={tshirt.sku}>
            <img src={tshirt.image} alt={tshirt.name} onClick={() => handleTshirtSelection(tshirt)} />
            <div className="tshirt-info">
              <p>Color: {tshirt.name}</p>
              <p>GSM: {tshirt.gsm}</p>
              <p>Product: {tshirt.product}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="button" onClick={() => setPage(3)}>Next</button>
      </div>
    </div>
  );
}

export default Page2;
