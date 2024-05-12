import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { fireDB } from '../firebase';
import '../firebase';
import '../Style/page1.css';
import '../Style/page2.css';
import '../Style/page3.css';

// Import data files
import tshirt from '../data/tshirt';
import designs from '../data/design';
import videos from '../data/videos';

function Unitee() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [size, setSize] = useState('');
  const [selectedTshirt, setSelectedTshirt] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedDesignDetails, setSelectedDesignDetails] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const storedCounter = localStorage.getItem('orderCounter');
  const initialOrderCounter = storedCounter ? parseInt(storedCounter) : 1000;
  const [orderCounter, setOrderCounter] = useState(initialOrderCounter);
  const [selectedArtist, setSelectedArtist] = useState(null); // Added state for selected artist
  
  const [page, setPage] = useState(1);
  const firestore = collection(fireDB, 'orders');

  useEffect(() => {
    // Generate order ID when component mounts
    generateOrderId();


  }, []);

  const generateOrderId = () => {
    // Generate order ID starting from 1000
    setOrderId((orderCounter + 1).toString());
  };

  const incrementOrderCounter = () => {
    setOrderCounter((prevCounter) => prevCounter + 1);
    localStorage.setItem('orderCounter', orderCounter + 1); // Update localStorage with orderCounter
    generateOrderId();
  };
  

  const handleStart = () => {
    // Perform validation of name, email, and size
    if (!name || !email || !size) {
      alert('Please fill out all fields');
      return;
    }
    // Proceed to T-shirt selection page
    setPage(2);
  };

  const handleTshirtSelection = (selectedTshirt) => {
    // Proceed to design selection page
    setSelectedTshirt(selectedTshirt);
    setSelectedDesign(null);
    setVideoPlaying(false);
  };

  const handleDesignSelection = (selectedDesign) => {
    // Set the selected design
    setSelectedDesign(selectedDesign);

    // Find the corresponding video URL for the selected combination of t-shirt and design
    const videoUrl = videos.find((video) => video.sku === `${selectedTshirt?.sku}-${selectedDesign.sku}`)?.videourl;

    const designDetails = designs.find((design) => design.sku === selectedDesign.sku);
    setSelectedDesignDetails(designDetails);

    // Update the video source
    const videoElement = document.getElementById('selectedVideo');
    if (videoElement) {
      videoElement.src = videoUrl;
      videoElement.play(); // Optional: Start playing the video automatically
    }

    // Start playing the video
    setVideoPlaying(true);
  };

  const handleConfirm = () => {

    // Perform validation
    if (!selectedTshirt || !selectedDesign) {
      alert('Please select a T-shirt and a Design');
      return;
    }
    setPage(4);
    // Store data in Firestore
    addDoc(firestore, {
      orderId: orderId,
      name: name,
      email: email,
      size: size,
      tshirt: selectedTshirt.name,
      design: selectedDesign.name,
      videoSKU: `${selectedTshirt.sku}-${selectedDesign.sku}`,
    })
    .then(() => {
        console.log('Order placed successfully');
        setOrderConfirmed(true); 
        setPage(4); 
        incrementOrderCounter(); 
        generateOrderId(); 
      })
      .catch((error) => {
        console.error('Error placing order: ', error);
        
      });
  };

  // Function to filter designs by selected artist
  const filteredDesigns = selectedArtist ? designs.filter(design => design.ArtistName === selectedArtist) : designs;

  return (
    <div>
      {/* Page 1: Enter Your Details */}
      {page === 1 && (
        <div className="page1-container">
          <h2>Enter Your Details</h2>
          {/* <audio controls>
          <source src="../Audio/page1.mp3" type="audio/mp3" />
             Your browser does not support the audio element.
          </audio> */}
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
          <button onClick={handleStart}>Start</button>
        </div>
      )}

      {/* Page 2: Select a T-shirt */}
      {page === 2 && (
        <div className="page2-container">
          <h2>Select a T-shirt</h2>
          {tshirt.map((tshirt) => (
            <img key={tshirt.sku} src={tshirt.image} alt={tshirt.name} onClick={() => handleTshirtSelection(tshirt)} />
          ))}
          <button onClick={() => setPage(3)}>Next</button>
        </div>
      )}

      {/* Page 3: Select a Design, View Video, Confirm */}
      {page === 3 && (
        <div className="page3-container">
          <div className="page3-video">
            <h2>Select a Design</h2>
            <video id="selectedVideo" controls autoPlay loop>
              <source src={videos.find((video) => video.sku === `${selectedTshirt?.sku}-${selectedDesign?.sku}`)?.videourl} type="video/mp4" />
              Your browser does not support the video tag.
            </video> 
          </div>
         
          <div className="page3-designs">
            {/* Dropdown for selecting artist */}
            <select value={selectedArtist} onChange={(e) => setSelectedArtist(e.target.value)}>
              <option value="">All Artists</option>
              {/* Create options from unique artist names */}
              {[...new Set(designs.map(design => design.ArtistName))].map(artist => (
                <option key={artist} value={artist}>{artist}</option>
              ))}
            </select>
            {/* Display designs filtered by selected artist */}
            {filteredDesigns.map((design) => (
              <img key={design.sku} src={design.image} alt={design.name} onClick={() => handleDesignSelection(design)} />
            ))}
          </div>
          {selectedDesignDetails && (
            <div>
              <p>Design Name: {selectedDesignDetails.name}</p>
              <p>Artist: {selectedDesignDetails.ArtistName}</p>
            </div>
          )}
          <button className="page3-confirm-button" onClick={handleConfirm}>Confirm</button>
          <button onClick={() => setPage(2)}>Back</button>
        </div>
      )}

      {/* Page 4: Confirmation */}
      {page === 4 && (
        <div className="page4-container">
          <h2>Hey {name}, your T-shirt is ready!</h2>
          <p>{orderId}</p>
        </div>
      )}
    </div>
  );
}

export default Unitee;
