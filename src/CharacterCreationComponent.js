import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import ReactModal from 'react-modal';
import { useCharacter } from './CharacterContext.js'
import { ChromePicker } from 'react-color';
import { countryOptions, genderOptions, hairLengthOptions, hairStyleOptions, bodyTypeOptions } from './CharacterOptions.js';
import './CharacterCreationComponent.css';

ReactModal.setAppElement('#root');

const CharacterCreationComponent = () => {
  const navigate = useNavigate();

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

  const handleSubmit = async event => {
    event.preventDefault();
    await textToImage();
    navigate('/character-display')
  };

  const { updateCharacterImage, updateCharacterDescription } = useCharacter();

  const textToImage = async () => {
    const path = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";
    const headers = {
      'Content-Type': 'application/json',
      'Accept': "application/json",
      'Authorization': "Bearer sk-mdinf40LfWHgFO3I3OO46ywesDj7MRX30JXaEkzuXHtsI9cq"
    };

    const countryList = countryOfOrigin.map(c => c.label).join(" and ");
    const description = `Generate a person with the following features: Age: ${age}, Gender: ${gender ? gender.label : 'person'}, Country: ${countryList}, Height: ${height} cm, Ensure hair color is ${hair.color}, Ensure hair length is ${hair.length ? hair.length.label : ''}, Ensure hair style is ${hair.style ? hair.style.label : ''}, Ensure eye color is ${eyeColor}, Ensure body type is ${bodyType}`;
    const body = {
      steps: 40,
      width: 1024,
      height: 1024,
      seed: 0,
      cfg_scale: 25,
      samples: 1,
      style_preset: "photographic",
      text_prompts: [
        {
          "text": description,
          "weight": 1
        }
      ],
    };

    const response = await fetch(path, {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`)
    }

    const responseJSON = await response.json();
    let imageData = [];
    
    responseJSON.artifacts.forEach((image, index) => {
      imageData.push(image.base64);
    });

    updateCharacterImage(imageData[0]);
    updateCharacterDescription(description);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Your Character</h1>
      <div className="form-row">
        <label>
          Name:
          <input type="text" value={name} onChange={e => handleInputChange(e, setName)} required />
        </label>
        <label>
          Age:
          <input type="number" value={age} min="18" onChange={e => handleInputChange(e, setAge)} required />
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
            required
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
            required
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Height (in cm):
          <input type="number" value={height} onChange={e => handleInputChange(e, setHeight)} required />
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
            required
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
            isSearchable={true}
            styles={customStyles}
            required
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
            required
          />
        </label>
      </div>
      <button type="submit">Create Character</button>
    </form>
  );
};

export default CharacterCreationComponent;