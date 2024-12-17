import React, { useState, useRef, useEffect, useContext } from "react";
import "./CountrySearch1.css";
import axiosInstance from "../../api/axiosInstance";
import Select from "react-select/base";
import { UserDataContext } from "../../contexts/UserDataContext";
import { DetailContext } from "../../contexts/DetailPageProvider";

const CountrySearch = ({ selectedSearchCountries, setSelectedSearchCountries}) => {
  const [countries, setCountries] = useState([]); // Countries data fetched from the API
  const [selectedCountries, setSelectedCountries] = useState([]); // Selected countries
  const [searchQuery, setSearchQuery] = useState(""); // Search filter query
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const { detailPageData, setDetailPageData } = useContext(DetailContext);

  // Refs for dropdown and input field
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);


  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/finhaatmaster/getdestination");
        const data = response.data;
        // console.log("API Response:", data);
        setCountries(data); // Set the fetched data as countries
      } catch (err) {
        console.error("Failed to fetch countries:", err);
        setError("Failed to fetch countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Handle selecting a country
  const handleCountrySelect = (country) => {
    const updatedCountries = [...selectedSearchCountries, country.countryName];
    setSelectedSearchCountries(updatedCountries);
    setSelectedCountries((prev) => [...prev, country]); // Add country to selected list
    
    setCountries((prev) => prev.filter((c) => c.id !== country.id)); // Remove it from dropdown
    setSearchQuery(""); // Reset search
    setShowDropdown(false); // Hide dropdown after selection
  };

  // Handle removing a selected country
  const handleRemoveCountry = (countryName) => {
    const updatedCountries = selectedCountries.filter((name) => name !== countryName);
    setSelectedSearchCountries(updatedCountries);
    setSelectedCountries((prev) => prev.filter((name) => name !== countryName)); // Remove from selected list
    setCountries((prev) => [...prev, countryName]); // Add it back to the dropdown
  };

  // Filter dropdown options based on search query
  const filteredCountries = countries.filter((country) =>
    country.countryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleCountryChange = (selectedOptions) => {
  //   const selectedValues = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
  //   setUserData((prevData) => ({
  //     ...prevData,
  //     destination: selectedValues,
  //   }));
  // };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false); // Hide dropdown when clicking outside
      }
    };

    // Add event listener for click outside
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="country-search-container">
      <label htmlFor="country-search-input">Select Countries</label>
      <div className="country-search-box">
        {/* Show loading or error messages */}
        {loading && <div>Loading countries...</div>}
        {error && <div className="error-message">{error}</div>}

        {/* Search Input and Selected Countries */}
        {!loading && !error && (
          <div className="search-input-container">
            {selectedCountries.map((country) => (
              <div key={country.id} className="selected-country">
                {country.countryName}
                <button onClick={() => handleRemoveCountry(country)}>x</button>
              </div>
            ))}
            <input
              ref={inputRef}
              id="country-search-input"
              type="text"
              placeholder={selectedCountries.length === 0 ? "Search Country" : ""}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true); // Show dropdown on input change
              }}
              className="country-search-input"
              onClick={() => setShowDropdown(true)} // Show dropdown on click
            />
          </div>
        )}

        {/* Dropdown */}
        {showDropdown && filteredCountries.length > 0 && (
          <div ref={dropdownRef} className="dropdown">
            {filteredCountries.map((country) => (
              <div
                key={country.id}
                className="dropdown-item"
                onClick={() => handleCountrySelect(country)}
              >
                {country.countryName}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountrySearch;
