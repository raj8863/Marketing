// src/utils/iconMapper.jsx
import React from 'react';

// 1. Import all the icons your app might need
import { 
    FaCode, 
    FaPaintBrush, 
    FaGlobe, 
    FaMobileAlt, 
    FaCloud, 
    FaShareAlt, 
    FaCogs,
    FaLightbulb,
    FaRocket
} from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

// 2. Create the dictionary mapping
const iconDictionary = {
    "FaCode": <FaCode />,
    "FaPaintBrush": <FaPaintBrush />,
    "FaGlobe": <FaGlobe />,
    "FaMobileAlt": <FaMobileAlt />,
    "FaCloud": <FaCloud />,
    "FaShareAlt": <FaShareAlt />,
    "FaCogs": <FaCogs />,
    "FaLightbulb": <FaLightbulb />,
    "FaRocket": <FaRocket />,
    "FaMagnifyingGlass": <FaMagnifyingGlass />
};

// 3. Export the utility function
export const getIconComponent = (iconString) => {
    if (iconDictionary[iconString]) {
        return iconDictionary[iconString];
    }
    return <FaCogs />; // Fallback icon
};