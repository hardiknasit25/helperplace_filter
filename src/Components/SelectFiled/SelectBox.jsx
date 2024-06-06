import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import { Label } from 'recharts';

function SelectBox({ currValue, setCurrValue, valueArray, handleOnChange}) {

  SelectBox.propTypes = {
    currValue: PropTypes.array.isRequired, // Adjust the type according to your data type
    setCurrValue: PropTypes.func.isRequired,
    valueArray: PropTypes.array.isRequired, // Adjust the type according to your data type
    handleOnChange: PropTypes.func.isRequired
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrValue(value);
    handleOnChange(value);
  };

  return (

    <FormControl className='w-full'>
      <Select
        className="w-full h-10 font-popins"
        multiple
        value={currValue}
        onChange={handleChange}
        style={{ color: "grey", fontFamily: "poppins", fontStyle: "thin", backgroundColor: "trnsperant", flex: "auto" }}
        renderValue={(selected) => selected.map(index => valueArray[index]).join(', ')}
      >
        {valueArray.map((name, index) => (
          <MenuItem key={index} value={index} style={{ fontFamily: "poppins" }}>
            <Checkbox checked={currValue.indexOf(index) > -1}/>
            <ListItemText primary={name} style={{ fontFamily: "poppins" }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectBox