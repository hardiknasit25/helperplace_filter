import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { ListSubheader } from '@mui/material';

function SelectBox({ currValue, setCurrValue, valueArray, handleOnChange, placeholder }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrValue(typeof value === 'string' ? value.split(',') : value);
    handleOnChange(value);
  };

  const filteredValueArray = valueArray.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FormControl className="w-[300px]">
      <Select
        className="w-full h-10 font-popins"
        multiple
        value={currValue}
        onChange={handleChange}
        displayEmpty 
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>{placeholder}</em>;
          }
          return selected.join(', ');
        }}
        onClose={() => setSearchQuery("")}
        style={{ color: 'grey', fontFamily: 'poppins', backgroundColor: 'transparent', flex: 'auto' }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 350, // Adjust the max height as needed
              width: 250,
            },
          },
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        }}
      >
        <ListSubheader>
          <TextField
            size="small"
            autoFocus
            placeholder="Type to search..."
            fullWidth
            InputProps={{
              style: {fontFamily: 'poppins'}
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Escape") {
                // Prevents autoselecting item while typing (default Select behaviour)
                e.stopPropagation();
              }
            }}
          />
        </ListSubheader>
        {filteredValueArray.length === 0 ? (
          <MenuItem disabled>
            <ListItemText primary="No options" style={{ fontFamily: 'poppins' }} />
          </MenuItem>
        ) : (
          filteredValueArray.map((name, index) => (
            <MenuItem key={index} value={name} style={{ fontFamily: 'poppins' }}>
              <Checkbox checked={currValue.includes(name)} style={{ color: '#25AE88' }} />
              <ListItemText primary={name} style={{ fontFamily: 'poppins' }} className="capitalize" />
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}

SelectBox.propTypes = {
  currValue: PropTypes.array.isRequired,
  setCurrValue: PropTypes.func.isRequired,
  valueArray: PropTypes.array.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default SelectBox;
