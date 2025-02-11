import PropTypes from 'prop-types';
import './Experience.css';

const Experience = ({ id, title, description, image, onDeleteExperience}) => {

  return (
    <div className={`experience-item`}>
      <p className="experience-title">{title}</p>
      <img 
        src={`https://map-journal-620a4d04c266.herokuapp.com/uploads/${image}`} 
        alt="Experience" 
        className="experience-image" 
      />
      <p className="experience-description">{description}</p>
      <div className="experience-buttons">
        <button className="delete-button" onClick={() => onDeleteExperience(id)}>Delete</button>
      </div>
    </div>
  );
};

Experience.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string, 
  onDeleteExperience: PropTypes.func.isRequired,
};

export default Experience;

