import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lastChangedField, setLastChangedField] = useState('');

  const name = searchParams.get('name') || '';
  const age = searchParams.get('age') || '';
  const skills = searchParams.getAll('skills').join(', ');

  const handleInputChange = (field, value) => {
    setLastChangedField(field);

    const newParams = new URLSearchParams();

    // Add the last changed field first
    if (value.trim() !== '') {
      if (field === 'skills') {
        newParams.set(field, value.split(', '));
      } else {
        newParams.set(field, value);
      }
    }

    // Add the rest of the search params, excluding the last changed field
    searchParams.forEach((paramValue, paramName) => {
      if (paramName !== field) {
        if (paramName === 'skills') {
          newParams.append(paramName, searchParams.getAll(paramName).join(', '));
        } else {
          newParams.append(paramName, paramValue);
        }
      }
    });

    setSearchParams(newParams);
  };

  return (
    <div>
      <h1>Jobs</h1>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your name"
          />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            placeholder="Enter your age"
          />
        </label>
      </div>
      <div>
        <label>
          Skills (comma separated):
          <input
            type="text"
            value={skills}
            onChange={(e) => handleInputChange('skills', e.target.value)}
            placeholder="Enter your skills"
          />
        </label>
      </div>
      <div>
        <h2>Current Search Params</h2>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Skills: {skills}</p>
      </div>
      <div>
        <h2>Last Changed Field</h2>
        <p>{lastChangedField}</p>
      </div>
    </div>
  );
}

export default Jobs;
