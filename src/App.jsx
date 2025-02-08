import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Country from "./components/Country";
import ExperiencePage from "./components/ExperiencePage";
import NewCountryForm from "./components/NewCountryForm";
import NewExperienceForm from "./components/NewExperienceForm";

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

  // Add or Update Country
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
      console.log('Country not found in database');
      axios.post(`${kBaseURL}/country`, payload)
        .then((response) => {
          console.log("New Country Added:", response.data);
          setCountryData((prevData) => [...prevData, response.data.country]);
        })
        .catch((error) => {
          console.error("Error adding country:", error);
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          } else if (error.request) {
            console.error("Request data:", error.request);
          } else {
            console.error("Error message:", error.message);
          }
        });
    } else {
      console.log("Country already exists:", country);
    }
  };

  // Update Country Status
  const handleUpdateCountryStatus = (countryName, status) => {
    const country = countryData.find((country) => country.name === countryName);
    if (country) {
      const payload = {
        borned: status === "born",
        visited: status === "visited",
        want_to_visit: status === "visit",
      };
      console.log("Payload:", payload);
      axios.patch(`${kBaseURL}/country/${country.id}`, payload)
        .then(() => {
          const updatedCountries = countryData.map((c) =>
            c.id === country.id ? { ...c, ...payload } : c
          );
          setCountryData(updatedCountries);
        })
        .catch((error) => console.error("Error updating country status:", error));
    } else {
      console.error("Country not found:", countryName);
    }
  };

  // Add a new experience
  const handleAddExperience = (experienceForm) => {
    // Create a new FormData instance
    console.log('Experience Form:', experienceForm);

    experienceForm.set("country_id", selectedCountryId);
  
    // Log to check the content of the FormData object
    console.log('FormData:', experienceForm);
  
    // Send the POST request with the FormData
    axios.post(`${kBaseURL}/country/${selectedCountryId}/experiences`, experienceForm, {
      headers: {
        'Content-Type': 'multipart/form-data'  // This tells axios to send as multipart form data
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

  // Add a new country
  const handleAddCountry = (country) => {
    axios.post(`${kBaseURL}/country`, country)
      .then((response) => {
        console.log('New Country:', response.data);
        setCountryData((prevData) => [...prevData, response.data.country]);
      })
      .catch((error) => {
        console.error('Error adding country:', error);
      });
  };

  // Update the selected country
  const handleSelectCountry = (countryName) => {
    setSelectedCountryName(countryName);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Map Journal</h1>
      </header>
      <main>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Country
                  countries={countryData}
                  onSelectionUpdate={handleAddOrUpdateCountry}
                  onSelectCountry={handleSelectCountry}
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
            <Route path="/new-country" element={<NewCountryForm onAddCountry={handleAddCountry} />} />
            <Route path="/new-experience" element={<NewExperienceForm handleSubmit={handleAddExperience} selectedCountryName={selectedCountryName} selectedCountryId={selectedCountryId} />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;