import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Map from "./components/Map";
import ExperiencePage from "./components/ExperiencePage";
import NewExperienceForm from "./components/NewExperienceForm";
import './index.css';

const kBaseURL = "https://map-journal-620a4d04c266.herokuapp.com";

// Transform the backend data format into a format suitable for the frontend.
const convertFromApi = (apiData) => {
  return {
    id: apiData.id,
    title: apiData.title,
    description: apiData.description,
    image: apiData.image,
    countryId: apiData.country_id
  };
};

function App() {
  const [countryData, setCountryData] = useState([]);
  const [selectedCountryName, setSelectedCountryName] = useState(null);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [experienceData, setExperienceData] = useState([]);
  const [countryStatuses, setCountryStatuses] = useState({}); 

    // Fetching Country Data
  useEffect(() => {
    axios.get(`${kBaseURL}/country`)
      .then((response) => {
        console.log('Countries', response.data); // Log the fetched country data
        setCountryData(response.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Fetching Experiences for a Selected Country
  useEffect(() => {
    if (selectedCountryName) {
      const country = countryData.find((country) => country.name === selectedCountryName);
      if (country) {
        setSelectedCountryId(country.id);
        axios.get(`${kBaseURL}/country/${country.id}/experiences`)
          .then((response) => {
            console.log('Experiences', response.data.experiences);
            setExperienceData(response.data.experiences.map(convertFromApi));
          })
          .catch((error) => {
            console.error('Error fetching experiences:', error);
          });
      }
    }
  }, [selectedCountryName, countryData]);

  const handleSelectCountry = (countryName) => {
    setSelectedCountryName(countryName);
  };

  const handleStatusChange = (countryName, status) => {
    // Update the countryStatuses state, setting the status for the selected country.
    setCountryStatuses((prevStatuses) => ({
      ...prevStatuses,
      [countryName]: status, 
    }));
  };

  const handleAddOrUpdateCountry = (countryName, status) => {
    const country = countryData.find((country) => country.name === countryName);
    const payload = {
      name: countryName,
      lat: 0,
      long: 0,
      borned: status === "born",
      visited: status === "visited",
      want_to_visit: status === "visit",
    };

    if (!country) {
      // Add a new country if it does not exist
      axios.post(`${kBaseURL}/country`, payload)
        .then((response) => {
          setCountryData((prevData) => [...prevData, response.data.country]);
        })
        .catch((error) => {
          console.error("Error adding country:", error);
        });
    } else {
      console.log("Country already exists:", country);
    }
  };

  //Add a new experience
  const handleAddExperience = (experienceForm) => {
    // Create a new FormData instance
    console.log('Experience Form:', experienceForm);

    experienceForm.set("country_id", selectedCountryId);
  
    // Log to check the content of the FormData object
    console.log('FormData:', experienceForm);
  
    // Send the POST request with the FormData
    axios.post(`${kBaseURL}/country/${selectedCountryId}/experiences`, experienceForm, {
      headers: {
        'Content-Type': 'multipart/form-data'  
      }
    })
    .then((response) => {
      const newExperience = convertFromApi(response.data);
      console.log('New Experience Added:', newExperience);
      setExperienceData((prevData) => [...prevData, newExperience]);
    })
    .catch((error) => {
      console.error('Error adding experience:', error);
    });
  };

  const handleDeleteExperience = (id) => {
    axios.delete(`${kBaseURL}/experiences/${id}`)
      .then(() => {
        console.log(`Experience with id ${id} deleted.`);
        setExperienceData((prevData) => prevData.filter((experience) => experience.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting experience:', error);
      });
  };


  return (
    <div className="App second-page-background">
      <header className="App-header" >
        <h1>My Map Journal</h1>
      </header>
      <main>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Map
                  countries={countryData}
                  selectedCountry={selectedCountryName}
                  countryStatuses={countryStatuses}
                  onStatusChange={handleStatusChange}
                  onSelectCountry={handleSelectCountry}
                  onSelectionUpdate={handleAddOrUpdateCountry}
                />
              }
            />
           <Route
              path="/experience/:country"
              element={
                <ExperiencePage
                   selectedCountryName={selectedCountryName}
                  setSelectedCountryName={setSelectedCountryName}
                   experienceData={experienceData}
                   handleAddExperience={handleAddExperience}
                  handleDeleteExperience={handleDeleteExperience}
                />
               }
             />
            <Route path="/new-experience" element={<NewExperienceForm handleSubmit={handleAddOrUpdateCountry} selectedCountryName={selectedCountryName} selectedCountryId={selectedCountryId} />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;

