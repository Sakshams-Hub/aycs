// Page3.jsx
import React from 'react';
import '../Style/page3.css';
import videos from '../data/videos';
import designs from '../data/design';

function Page3({ setPage, handleDesignSelection, selectedTshirt, selectedDesign, selectedArtist, setSelectedArtist }) {
  const filteredDesigns = selectedArtist ? designs.filter(design => design.ArtistName === selectedArtist) : designs;

  return (
    <div className="page3-container">
      <div className="page3-content">
        <div className="page3-video">
          <h2>Select a Design</h2>
          <video id="selectedVideo" controls autoPlay loop>
            <source src={videos.find((video) => video.sku === `${selectedTshirt?.sku}-${selectedDesign?.sku}`)?.videourl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="page3-designs">
          <select value={selectedArtist} onChange={(e) => setSelectedArtist(e.target.value)}>
            <option value="">All Artists</option>
            {[...new Set(designs.map(design => design.ArtistName))].map(artist => (
              <option key={artist} value={artist}>{artist}</option>
            ))}
          </select>
          <div className="designs-row">
            {filteredDesigns.map((design) => (
              <img key={design.sku} src={design.image} alt={design.name} onClick={() => handleDesignSelection(design)} />
            ))}
          </div>
        </div>
      </div>

      <div className="page3-buttons">
        <button className="page3-confirm-button" onClick={() => setPage(4)}>Confirm</button>
        <button onClick={() => setPage(2)}>Back</button>
      </div>
    </div>
  );
}

export default Page3;
