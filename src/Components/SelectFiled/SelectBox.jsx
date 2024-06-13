import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

function SelectBox({ currValue, setCurrValue, valueArray, handleOnChange }) {

  SelectBox.propTypes = {
    currValue: PropTypes.array.isRequired,
    setCurrValue: PropTypes.func.isRequired,
    valueArray: PropTypes.array.isRequired,
    handleOnChange: PropTypes.func.isRequired,
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrValue(typeof value === 'string' ? value.split(',') : value,);
    handleOnChange(value)
    };

  return (
    <FormControl className='w-[300px]'>
      <Select
        className="w-full h-10 font-popins"
        multiple
        value={currValue}
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        style={{ color: "grey", fontFamily: "poppins", backgroundColor: "transparent", flex: "auto" }}
      >
        {valueArray.map((name, index) => (
          <MenuItem key={index} value={name} style={{ fontFamily: "poppins" }}>
            <Checkbox checked={currValue.includes(name)} style={{ color: "#25AE88" }} />
            <ListItemText primary={name} style={{ fontFamily: "poppins" }} class=' capitalize' />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectBox;
