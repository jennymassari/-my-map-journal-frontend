// // import React, { useState, useEffect } from "react";
// // import PropTypes from "prop-types";


// // const NewCountryForm = ({ handleSubmit, selectedCountryId }) => {
// //   const [countryForm, setCountryForm] = useState({
// //     name: "",
// //     lat: "",
// //     long: "",
// //     borned: false,
// //     visited: false,
// //     want_to_visit: false,
// //   });
// //   const [error, setError] = useState("");

// //   const handleChange = (event) => {
// //     const { name, value, type, checked } = event.target;
// //     setCountryForm({
// //       ...countryForm,
// //       [name]: type === "checkbox" ? checked : value,
// //     });
// //     setError("");
// //   };

// //   const onHandleSubmit = (event) => {
// //     event.preventDefault();
// //     const { name, lat, long, borned, visited, want_to_visit } = countryForm;
// //     if (!name || lat === "" || long === "" || borned === null || visited === null || want_to_visit === null) {
// //       setError("All fields are required.");
// //       return;
// //     }
// //     setError("");
// //     handleSubmit(countryForm);
// //     setCountryForm({
// //       name: "",
// //       lat: "",
// //       long: "",
// //       borned: false,
// //       visited: false,
// //       want_to_visit: false,
// //     });
// //   };

// //   useEffect(() => {
// //     setError("");
// //   }, [selectedCountryId]);

// //   return (
// //     <form className="new-country-form" onSubmit={onHandleSubmit}>
// //       <div>
// //         <label htmlFor="name">Country Name: </label>
// //         <input
// //           id="name"
// //           name="name"
// //           value={countryForm.name}
// //           onChange={handleChange}
// //           placeholder="Country Name"
// //           required
// //         />
// //       </div>
// //       <div>
// //         <label htmlFor="lat">Latitude: </label>
// //         <input
// //           id="lat"
// //           name="lat"
// //           value={countryForm.lat}
// //           onChange={handleChange}
// //           placeholder="Latitude"
// //           required
// //         />
// //       </div>
// //       <div>
// //         <label htmlFor="long">Longitude: </label>
// //         <input
// //           id="long"
// //           name="long"
// //           value={countryForm.long}
// //           onChange={handleChange}
// //           placeholder="Longitude"
// //           required
// //         />
// //       </div>
// //       <div>
// //         <label>
// //           <input
// //             type="checkbox"
// //             name="borned"
// //             checked={countryForm.borned}
// //             onChange={handleChange}
// //           />
// //           Borned
// //         </label>
// //       </div>
// //       <div>
// //         <label>
// //           <input
// //             type="checkbox"
// //             name="visited"
// //             checked={countryForm.visited}
// //             onChange={handleChange}
// //           />
// //           Visited
// //         </label>
// //       </div>
// //       <div>
// //         <label>
// //           <input
// //             type="checkbox"
// //             name="want_to_visit"
// //             checked={countryForm.want_to_visit}
// //             onChange={handleChange}
// //           />
// //           Want to Visit
// //         </label>
// //       </div>
// //       {error && <p className="error-message">{error}</p>}
// //       <button className="new-country-form-submit-btn" type="submit">
// //         Add Country
// //       </button>
// //     </form>
// //   );
// // };

// // NewCountryForm.propTypes = {
// //   handleSubmit: PropTypes.func.isRequired,
// //   selectedCountryId: PropTypes.number,
// // };

// // export default NewCountryForm;



