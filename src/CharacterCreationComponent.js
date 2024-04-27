import React, { useState } from 'react';
import Select from 'react-select';
import ReactModal from 'react-modal';
import { countryOptions, genderOptions, hairLengthOptions, hairStyleOptions, bodyTypeOptions } from './CharacterOptions.js';
import { ChromePicker } from 'react-color';
import './CharacterCreationComponent.css';

ReactModal.setAppElement('#root');

const CharacterCreationComponent = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState(null);
  const [countryOfOrigin, setCountryOfOrigin] = useState([]);
  const [height, setHeight] = useState('');
  const [hair, setHair] = useState({ length: '', style: '', color: '#FFFFFF' });
  const [eyeColor, setEyeColor] = useState('#FFFFFF');
  const [bodyType, setBodyType] = useState('');
  const [showColorPicker, setShowColorPicker] = useState({
    hair: false,
    eyes: false,
  });
  const [tempColor, setTempColor] = useState({ hair: '#FFFFFF', eyes: '#FFFFFF' });

  const customStyles = {
    control: provided => ({
      ...provided,
      width: '100%',
      padding: '0px',
      marginTop: '5px',
      boxSizing: 'border-box',
      minHeight: '10px',
    }),
    placeholder: provided => ({
      ...provided,
      fontSize: '12px',
    }),
  };

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleColorChange = (color, colorType) => {
    setTempColor(prev => ({ ...prev, [colorType]: color.hex }));
  };

  const handleSaveColor = (colorType) => {
    if (colorType === 'hair') {
      setHair(h => ({ ...h, color: tempColor.hair }));
      handleColorPickerToggle('hair');
    } 
    if (colorType === 'eyes') {
      setEyeColor(tempColor.eyes);
      handleColorPickerToggle('eyes');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Character Created:', { name, age, gender, countryOfOrigin, height, hair, eyeColor, bodyType });
  };

  const handleSelectChange = (selectedOption, action) => {
    if (action.name === 'gender') {
      setGender(selectedOption);
    } 
    if (action.name === 'countryOfOrigin') {
      if (selectedOption.length <= 2) {
        setCountryOfOrigin(selectedOption);
      } else {
        alert('You can only select up to 2 countries.');
      }
    }
  };

  const handleColorPickerToggle = (colorType) => {
    setShowColorPicker(prev => ({
      ...prev,
      [colorType]: !prev[colorType]
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Your Character</h1>
      <div className="form-row">
        <label>
          Name:
          <input type="text" value={name} onChange={e => handleInputChange(e, setName)} />
        </label>
        <label>
          Age:
          <input type="number" value={age} min="18" onChange={e => handleInputChange(e, setAge)} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Gender:
          <Select
            name="gender"
            value={gender}
            onChange={handleSelectChange}
            options={genderOptions}
            placeholder="Select Gender"
            isSearchable={false}
            styles={customStyles}
          />
        </label>
        <label>
          Country of Origin:
          <Select
            name="countryOfOrigin"
            value={countryOfOrigin}
            onChange={handleSelectChange}
            options={countryOptions}
            placeholder="Select up to 2 countries"
            isMulti
            closeMenuOnSelect={false}
            styles={customStyles}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Height (please enter in cm):
          <input type="number" value={height} onChange={e => handleInputChange(e, setHeight)} />
        </label>
        <label>
          Eye Color:
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button type="button" onClick={() => handleColorPickerToggle('eyes')}>Select Color</button>
            <div className="color-display" style={{ backgroundColor: eyeColor }}></div>
          </div>
          <ReactModal 
            isOpen={showColorPicker.eyes}
            onRequestClose={() => handleColorPickerToggle('eyes')}
            contentLabel="Eye Color Picker"
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            <ChromePicker color={tempColor.eyes} onChange={color => handleColorChange(color, 'eyes')} />
            <button onClick={() => handleSaveColor('eyes')}>Save Color</button>
          </ReactModal>
        </label>
      </div>
      <div className="form-row">
        <label>
          Hair Length:
          <Select
            name="hairLength"
            value={hair.length ? hairLengthOptions.find(option => option.value === hair.length) : null}
            onChange={(selectedOption) => setHair({ ...hair, length: selectedOption.value })}
            options={hairLengthOptions}
            placeholder="Select Hair Length"
            styles={customStyles}
          />
        </label>
        <label>
          Hair Color:
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button type="button" onClick={() => handleColorPickerToggle('hair')}>Select Color</button>
            <div className="color-display" style={{ backgroundColor: hair.color }}></div>
          </div>
          <ReactModal 
            isOpen={showColorPicker.hair}
            onRequestClose={() => handleColorPickerToggle('hair')}
            contentLabel="Hair Color Picker"
            className="modal-content"
            overlayClassName="modal-overlay"
          >
            <ChromePicker color={tempColor.hair} onChange={color => handleColorChange(color, 'hair')} />
            <button onClick={() => handleSaveColor('hair')}>Save Color</button>
          </ReactModal>
        </label>
      </div>
      <div className="form-row">
        <label>
          Hair Style:
          <Select
            name="hairStyle"
            value={hair.style ? hairStyleOptions.find(option => option.value === hair.style) : null}
            onChange={(selectedOption) => setHair({ ...hair, style: selectedOption.value })}
            options={hairStyleOptions}
            placeholder="Select Hair Style"
            isSearchable={true} // Enable searching
            styles={customStyles}
          />
        </label>
        <label>
          Body Type:
          <Select
            name="bodyType"
            value={bodyType ? bodyTypeOptions.find(option => option.value === bodyType) : null}
            onChange={(selectedOption) => setBodyType(selectedOption.value)}
            options={bodyTypeOptions}
            placeholder="Select Body Type"
            isSearchable={true}
            styles={customStyles}
          />
        </label>
      </div>
      <button type="submit">Create Character</button>
    </form>
  );
};

export default CharacterCreationComponent;