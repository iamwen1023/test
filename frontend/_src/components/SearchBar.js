import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle search submission here (e.g., call API to search listings)
    console.log('Search term:', searchTerm);
    setSearchTerm(''); // Reset search term after submission (optional)
  };

  return (
    <Form className="d-flex mb-3" onSubmit={handleSubmit}>
      <FormControl
        type="search"
        placeholder="Search location, dates, etc."
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button type="submit" variant="primary">Search</Button>
    </Form>
  );
};

export default SearchBar;
