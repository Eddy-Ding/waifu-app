import { countries } from 'countries-list';

export const countryOptions = Object.values(countries).map(country => ({
    value: country.name,
    label: country.name
}));    
  
export const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
];

export const hairLengthOptions = [
    { value: 'buzz cut', label: 'Buzz Cut' },
    { value: 'ear length', label: 'Ear Length' },
    { value: 'chin length', label: 'Chin Length' },
    { value: 'shoulder length', label: 'Shoulder Length' },
    { value: 'armpit length', label: 'Armpit Length' },
    { value: 'mid-back length', label: 'Mid-Back Length' },
    { value: 'tailbone length', label: 'Tailbone Length' },
];

export const hairStyleOptions = [
    { value: 'buzz cut', label: 'Buzz Cut' },
    { value: 'crew cut', label: 'Crew Cut' },
    { value: 'quiff', label: 'Quiff' },
    { value: 'pompadour', label: 'Pompadour' },
    { value: 'slick back', label: 'Slick Back' },
    { value: 'side part', label: 'Side Part' },
    { value: 'undercut', label: 'Undercut' },
    { value: 'mohawk', label: 'Mohawk' },
    { value: 'faux hawk', label: 'Faux Hawk' },
    { value: 'ivy league', label: 'Ivy League' },
    { value: 'caesar cut', label: 'Caesar Cut' },
    { value: 'french crop', label: 'French Crop' },
    { value: 'bro flow', label: 'Bro Flow' },
    { value: 'man bun', label: 'Man Bun' },
    { value: 'top knot', label: 'Top Knot' },
    { value: 'high and tight', label: 'High and Tight' },
    { value: 'flat top', label: 'Flat Top' },
    { value: 'dreadlocks', label: 'Dreadlocks' },
    { value: 'afro', label: 'Afro' },
    { value: 'mullet', label: 'Mullet' },
    { value: 'bob', label: 'Bob' },
    { value: 'pixie cut', label: 'Pixie Cut' },
    { value: 'long layers', label: 'Long Layers' },
    { value: 'bangs', label: 'Bangs' },
    { value: 'french braid', label: 'French Braid' },
    { value: 'dutch braid', label: 'Dutch Braid' },
    { value: 'fishtail braid', label: 'Fishtail Braid' },
    { value: 'waterfall braid', label: 'Waterfall Braid' },
    { value: 'chignon', label: 'Chignon' },
    { value: 'bun', label: 'Bun' },
    { value: 'ponytail', label: 'Ponytail' },
    { value: 'updo', label: 'Updo' },
    { value: 'half-up, half-down', label: 'Half-Up, Half-Down' },
    { value: 'beach waves', label: 'Beach Waves' },
    { value: 'straight', label: 'Straight' },
    { value: 'curly', label: 'Curly' },
    { value: 'side sweep', label: 'Side Sweep' },
    { value: 'shag', label: 'Shag' },
    { value: 'voluminous curls', label: 'Voluminous Curls' },
    { value: 'box braids', label: 'Box Braids' }
];

export const bodyTypeOptions = [
    { value: 'ectomorph', label: 'Ectomorph' },
    { value: 'mesomorph', label: 'Mesomorph' },
    { value: 'endomorph', label: 'Endomorph' },
    { value: 'hourglass', label: 'Hourglass' },
    { value: 'rectangle', label: 'Rectangle' },
    { value: 'apple', label: 'Apple' },
    { value: 'pear', label: 'Pear' },
    { value: 'inverted triangle', label: 'Inverted Triangle' },
    { value: 'athletic', label: 'Athletic' },
    { value: 'slim', label: 'Slim' },
    { value: 'stocky', label: 'Stocky' },
    { value: 'petite', label: 'Petite' },
    { value: 'plus size', label: 'Plus Size' },
    { value: 'muscular', label: 'Muscular' },
    { value: 'curvy', label: 'Curvy' },
    { value: 'lanky', label: 'Lanky' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'fit', label: 'Fit' },
    { value: 'heavyset', label: 'Heavyset' },
    { value: 'lean', label: 'Lean' },
    { value: 'sturdy', label: 'Sturdy' },
    { value: 'compact', label: 'Compact' },
    { value: 'skinny', label: 'Skinny' }
];