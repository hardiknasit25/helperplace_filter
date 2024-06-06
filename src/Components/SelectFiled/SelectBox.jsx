import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';

function SelectBox({ currValue, setCurrValue, valueArray, }) {

  SelectBox.propTypes = {
    currValue: PropTypes.array.isRequired, // Adjust the type according to your data type
    setCurrValue: PropTypes.func.isRequired,
    valueArray: PropTypes.array.isRequired, // Adjust the type according to your data type
  };

  return (

    <FormControl className='w-full'>
      <Select
        className="w-full h-10 font-popins"
        multiple
        value={currValue}
        onChange={(e) => setCurrValue(e.target.value)}
        style={{ color: "grey", fontFamily: "poppins", fontStyle: "thin", backgroundColor: "trnsperant", flex: "auto" }}
        renderValue={(selected) => selected.map(index => valueArray[index]).join(', ')}
      >
        {valueArray.map((name, index) => (
          <MenuItem key={index} value={index}>
            <Checkbox checked={currValue.indexOf(index) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectBox