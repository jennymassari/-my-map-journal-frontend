// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// const NewExperienceForm = ({ handleSubmit, experienceId }) => {
//   const [experienceForm, setExperienceForm] = useState({ title: '', description: '', image: null });
//   const [error, setError] = useState('');

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setExperienceForm({ ...experienceForm, [name]: value });
//     setError('');
//   };

//   const onHandleSubmit = (event) => {
//     event.preventDefault();
//     if (experienceForm.title === '' || experienceForm.description === '') {
//       setError('Please fill the Title and Experience fields');
//     } else {
//       handleSubmit(experienceForm);
//       setExperienceForm({ title: '', description: '', image: null });
//     }
//   };

//   useEffect(() => {
//     setError('');
//   }, [experienceId]);

//   return (
//     <form onSubmit={onHandleSubmit}>
//       <h2>Add/Plan New Experience</h2>
//       <input
//         type="text"
//         name="title"
//         value={experienceForm.title}
//         onChange={handleChange}
//         placeholder="Title"
//         required
//       />
//       <textarea
//         name="description"
//         value={experienceForm.description}
//         onChange={handleChange}
//         placeholder="Description"
//         required
//       />
//       <input type="file" onChange={(e) => setExperienceForm({ ...experienceForm, image: e.target.files[0] })} />
//       <button type="submit">Add Experience</button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };

// NewExperienceForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   experienceId: PropTypes.number, // Optional
// };

// export default NewExperienceForm;

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const NewExperienceForm = ({ handleSubmit, experienceId }) => {
  const [experienceForm, setExperienceForm] = useState({ title: '', description: '', image: null });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExperienceForm({ ...experienceForm, [name]: value });
    setError('');
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    
    if (experienceForm.title === '' || experienceForm.description === '') {
      setError('Please fill the Title and Experience fields');
    } else {
      // Create FormData instance to handle file upload
      const formData = new FormData();
      formData.append('title', experienceForm.title);
      formData.append('description', experienceForm.description);
      if (experienceForm.image) {
        formData.append('image', experienceForm.image);
      }

      handleSubmit(formData);
      setExperienceForm({ title: '', description: '', image: null });
    }
  };

  useEffect(() => {
    setError('');
  }, [experienceId]);

  return (
    <form onSubmit={onHandleSubmit}>
      <h2>Add/Plan New Experience</h2>
      <input
        type="text"
        name="title"
        value={experienceForm.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={experienceForm.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input type="file" onChange={(e) => setExperienceForm({ ...experienceForm, image: e.target.files[0] })} />
      <button type="submit">Add Experience</button>
      {error && <p>{error}</p>}
    </form>
  );
};

NewExperienceForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  experienceId: PropTypes.number, // Optional
};

export default NewExperienceForm;


