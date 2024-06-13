import { useState } from 'react';
import Select, { components } from 'react-select';

function Jobs() {
  const lang = [
    'English', 'Cantonese', 'Mandarin', 'Japanese', 'Arabic',
    'Filipino', 'Indonesian', 'Hindi', 'Thai'
  ];

  const options = lang.map((language) => ({
    value: language,
    label: language
  }));

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleonChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  const formatSelectedOptions = (selectedOptions) => {
    return selectedOptions.map(option => `${option.label}`).join('');
  };

  const CheckboxOption = ({ children,isSelected, ...props }) => (
    <components.Option {...props}>
      <div className='flex justify-start items-center'>
        <input type="checkbox" checked={isSelected} onChange={() => props.isFocused} className='mr-2 w-4 h-4' />
        <label>{children}</label>
      </div>
    </components.Option>
  );

  const selectedString = formatSelectedOptions(selectedOptions);

  return (
    <Select
      value={{ value: selectedString, label: selectedString }}
      onChange={handleonChange}
      placeholder="Select an option..." 
      options={options}
      isMulti
      isSearchable
      components={{ Option: CheckboxOption }}
      styles={{
        clearIndicator: (baseStyles) => ({
          ...baseStyles,
          color: "grey",
          cursor: 'pointer'
        }),
        multiValueLabel: () => ({
          background: "transperant",
          backgroundColor: 'transperant'
        }),
        multiValueRemove: () => ({
          background: "none",
          display: 'none'
        }),
        singleValue: () => ({
          background: 'transperant'
        }),
        multiValue: () => ({
          background: 'none'
        })
      }}
    />
  );
}

export default Jobs;