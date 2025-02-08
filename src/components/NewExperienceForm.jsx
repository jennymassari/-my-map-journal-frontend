import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NewExperienceForm.css";

const NewExperienceForm = ({ handleSubmit, selectedCountryName, selectedCountryId }) => {
  const [experienceForm, setExperienceForm] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setExperienceForm({ ...experienceForm, image: files[0] });
    } else {
      setExperienceForm({ ...experienceForm, [name]: value });
    }
    setError("");
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();

    if (experienceForm.title === "" || experienceForm.description === "") {
      setError("Please fill the Title and Experience fields");
    } else {
      const formData = new FormData();
      formData.append("title", experienceForm.title);
      formData.append("description", experienceForm.description);
      if (experienceForm.image) {
        formData.append("image", experienceForm.image);
      }

      formData.append("country_id", selectedCountryId);  // Ensure the selected country ID is included in the form submission
      handleSubmit(formData, selectedCountryName);  // Call the handler function
      setExperienceForm({ title: "", description: "", image: null });
    }
  };

  return (
    <form className="new-experience-form" onSubmit={onHandleSubmit}>
      <h2>Add/Plan New Experience</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={experienceForm.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={experienceForm.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Add Experience</button>
    </form>
  );
};

// PropTypes definition
NewExperienceForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  selectedCountryName: PropTypes.string.isRequired,
  selectedCountryId: PropTypes.number.isRequired,  
};

export default NewExperienceForm;