// import PropTypes from 'prop-types';

// const Experience = ({ id, title, description, image, onDeleteExperience }) => {
//   return (
//     <div className="experience-item">
//       <p className="experience-title">{title}</p>
//       <p className="experience-description">{description}</p>
//       {image && <img src={image} alt={title} className="experience-image" />}
//       <div className="experience-buttons">
//         <button className="delete-button" onClick={() => onDeleteExperience(id)}>Delete</button>
//       </div>
//     </div>
//   );
// }

// Experience.propTypes = {
//   id: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   image: PropTypes.string, // Optional
//   onDeleteExperience: PropTypes.func,
// };

// export default Experience;

import PropTypes from 'prop-types';

const Experience = ({ id, title, description, image, onDeleteExperience }) => {
  return (
    <div className="experience-item">
      <p className="experience-title">{title}</p>
      <p className="experience-description">{description}</p>
      {image && <img src={image} alt={title} className="experience-image" />}
      <div className="experience-buttons">
        <button className="delete-button" onClick={() => onDeleteExperience(id)}>Delete</button>
      </div>
    </div>
  );
}

Experience.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string, // Optional
  onDeleteExperience: PropTypes.func.isRequired,
};

export default Experience;
