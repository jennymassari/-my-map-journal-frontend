import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import geoData from "../data/countries.geo.json"; 
import "leaflet/dist/leaflet.css";
import './Map.css';

const Country = ({ countries, selectedCountry, countryStatuses, onStatusChange, onSelectCountry, onSelectionUpdate }) => {
  const navigate = useNavigate(); 

  // handleCountryClick: Function that handles when a country is clicked on the map.
  const handleCountryClick = (e) => {
    const countryName = e.target.feature.properties.name; 
    onSelectCountry(countryName); 
  };

  // handleStatusChange: Function that updates the status of the selected country
  const handleStatusChange = (status) => {
    if (selectedCountry) {
      if (status === "") {
        // Unselect all statuses
        onStatusChange(selectedCountry, "none");
        onSelectionUpdate(selectedCountry, "none");
      } else {
        onStatusChange(selectedCountry, status); 
        onSelectionUpdate(selectedCountry, status); 
      }
    }
  };

  const goToExperience = () => {
    if (selectedCountry) {
      const status = countryStatuses[selectedCountry];
      if (status) {
        const countryId = countries.find((country) => country.name === selectedCountry)?.id;
        navigate(`/experience/${countryId}`, { state: { countryName: selectedCountry, status } });
      } else {
        alert("Please select a status for the country first!");
      }
    } else {
      alert("Please select a country first!");
    }
  };

  // getColor: A function that returns a color based on the status of a country.
  const getColor = (country) => {
    const status = countryStatuses[country] || 'none';
    switch (status) {
      case 'born':
        return 'red'; 
      case 'visit':
        return 'orange'; 
      case 'visited':
        return 'green'; 
      default:
        return '#cccccc'; 
    }
  };

  const countryStyle = {
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };

  // Legend component
  const Legend = () => {
    return (
      <div className="legend">
        <h4>Legend:</h4>
        <div><span style={{ backgroundColor: 'red' }}></span> Born in</div>
        <div><span style={{ backgroundColor: 'orange' }}></span> Want to Visit</div>
        <div><span style={{ backgroundColor: 'green' }}></span> Visited</div>
      </div>
    );
  };

  // Function to handle mouseover event
  const handleMouseOver = (e) => {
    const layer = e.target;

    layer.setStyle({
      weight: 2,
      dashArray: '',
      fillOpacity: 0.7,
      fillColor: '#F68D80' 
    });
  };

  // Function to handle mouseout event
const handleMouseOut = (e) => {
  const layer = e.target;
  const countryName = layer.feature.properties.name;
  layer.setStyle({
    weight: 2,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: getColor(countryName) 
  });
};


  // Function to handle each feature
  const onEachFeature = (feature, layer) => {
    layer.on({
      click: handleCountryClick, 
      mouseover: handleMouseOver, 
      mouseout: handleMouseOut 
    });
    layer.bindTooltip(feature.properties.name); 
  };

  return (
    <div className="container"> 
      <h2>Select a Country</h2>
      <div className="map-container">
        <MapContainer center={[20, 0]} zoom={2} style={{ width: "100%", height: "100%" }} className="map-border">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GeoJSON
            data={geoData} 
            style={(feature) => ({
              ...countryStyle,
              fillColor: getColor(feature.properties.name), 
            })}
            onEachFeature={onEachFeature} 
          />
          <Legend />
        </MapContainer>
      </div>

      {selectedCountry && (
        <div>
          <h2>Selected Country: {selectedCountry}</h2>
          <h3>Please select one of the following options:</h3>
          <div className="status-buttons">
            <button onClick={() => handleStatusChange("born")}>Born in</button>
            <button onClick={() => handleStatusChange("visit")}>Want to Visit</button>
            <button onClick={() => handleStatusChange("visited")}>Visited</button>
            <button onClick={() => handleStatusChange("")}>Unselect option</button>
          </div>
          <div className="additional-space">
          <h2>Add or plan your trip in {selectedCountry}:</h2>
          <button onClick={goToExperience}>Add/View Experience</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Country;




