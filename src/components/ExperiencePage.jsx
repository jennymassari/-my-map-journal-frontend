import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewExperienceForm from './NewExperienceForm';
import Experience from './Experience';
import PropTypes from 'prop-types';

const ExperiencePage = ({ selectedCountryName, setSelectedCountryName, experienceData, handleAddExperience, handleDeleteExperience }) => {
  const { country: countryParam } = useParams();

  useEffect(() => {
    if (!selectedCountryName) {
      setSelectedCountryName(countryParam);
    }
  }, [countryParam, selectedCountryName, setSelectedCountryName]);

  return (
    <div>
      <h1>Experience in {selectedCountryName || countryParam}</h1>
      <NewExperienceForm handleSubmit={handleAddExperience} />
      <div className="experience-items-container">
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
  selectedCountryName: PropTypes.string,
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