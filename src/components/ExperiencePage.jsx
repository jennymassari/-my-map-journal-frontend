import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import NewExperienceForm from "./NewExperienceForm";
import Experience from "./Experience";
import PropTypes from "prop-types";
import './ExperiencePage.css';

const ExperiencePage = ({
  setSelectedCountryName,
  experienceData,
  handleAddExperience,
  handleDeleteExperience,
}) => {
  // Extract countryId from the URL using useParams
  const { countryId } = useParams();

  // Extract the state passed from navigate (contains countryName and status)
  const location = useLocation();
  const { countryName, status } = location.state || {};

  const [selectedCountry, setSelectedCountry] = useState(countryName);

  useEffect(() => {
    if (countryName && !selectedCountry) {
      setSelectedCountry(countryName);
    }
  }, [countryName, selectedCountry]);

  // You can use countryId to fetch data specific to the country (if needed)

  return (
    <div>
      <h1>Experience in {selectedCountry || "Country"}</h1>

      <NewExperienceForm handleSubmit={handleAddExperience} />
      <div className="experience-items-container ">
        {experienceData.map((experience) => (
          <Experience
            key={experience.id}
            id={experience.id}
            title={experience.title}
            description={experience.description}
            image={experience.image}
            onDeleteExperience={handleDeleteExperience}
          />
        ))}
      </div>
    </div>
  );
};

ExperiencePage.propTypes = {
  setSelectedCountryName: PropTypes.func.isRequired,
  experienceData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
  handleAddExperience: PropTypes.func.isRequired,
  handleDeleteExperience: PropTypes.func.isRequired,
};

export default ExperiencePage;


