import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';

function SelectBox({ currValue, setCurrValue, valueArray, handleOnChange }) {

  SelectBox.propTypes = {
    currValue: PropTypes.array.isRequired, // Adjust the type according to your data type
    setCurrValue: PropTypes.func.isRequired,
    valueArray: PropTypes.array.isRequired, // Adjust the type according to your data type
    handleOnChange: PropTypes.func.isRequired,
    selectedValues: PropTypes.array
  };

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   // setSelectedValues(value);
  //   setCurrValue(value);
  //   handleOnChange(value);
  // };

  const handleChange = (event) => {
    const { value } = event.target;
    const newValue = currValue.includes(value)
      ? currValue.filter(item => item !== value) // Deselect if already selected
      : [...currValue, value]; // Select if not selected

    setCurrValue(newValue);
    handleOnChange(newValue);
  };



  // useEffect(() => {
  //   setCurrValue(selectedValues || []); // Add a null check or default value
  // }, [selectedValues, setCurrValue]);

  // const [checkedItems, setCheckedItems] = useState({});

  // useEffect(() => {
  //   const newCheckedItems = {};
  //   currValue.forEach(value => {
  //     newCheckedItems[value] = true;
  //   });
  //   setCheckedItems(newCheckedItems);
  // }, [currValue]);

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   const updatedCheckedItems = { ...checkedItems, [value]: !checkedItems[value] };
  //   setCheckedItems(updatedCheckedItems);
  //   setCurrValue(Object.keys(updatedCheckedItems).filter(item => updatedCheckedItems[item]));
  //   handleOnChange(value);
  // };

  return (

    <FormControl className='w-[300px]'>
      <Select
        className="w-full h-10 font-popins"
        multiple
        value={currValue}
        onChange={handleChange}
        style={{ color: "grey", fontFamily: "poppins", backgroundColor: "trnsperant", flex: "auto" }}
        renderValue={(selected) => selected.join(', ')}
      >
        {valueArray.map((name, index) => (
          <MenuItem key={index} value={name} style={{ fontFamily: "poppins" }}>
            <Checkbox checked={currValue.indexOf(name) > -1} style={{ color: "#25AE88" }} />
            {/* <Checkbox checked={Array.isArray(languageIndex) && languageIndex.includes(index)} style={{ color: "#25AE88" }} /> */}
            <ListItemText primary={name} style={{ fontFamily: "poppins" }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectBox