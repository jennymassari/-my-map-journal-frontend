import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Experience = () => {
  const { country } = useParams(); // Get the country from URL params
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit experience form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      // Submit the form data to your backend
      await axios.post(`/api/experiences/${country}`, formData);
      alert("Experience added successfully!");
    } catch (error) {
      console.error("Error adding experience:", error);
      alert("Failed to add experience.");
    }

    setIsSubmitting(false); // Reset the submitting state
  };

  return (
    <div>
      <h1>Add Experience for {country}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image</label>
          <input type="file" onChange={handleImageChange} required />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Experience"}
        </button>
      </form>
    </div>
  );
};

export default Experience;