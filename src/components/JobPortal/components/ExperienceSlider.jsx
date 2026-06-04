import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

const ExperienceSlider = ({ min, max, label, initialMin, initialMax, step = 1, onChange }) => {
    const [minValue, setMinValue] = useState(initialMin);
    const [maxValue, setMaxValue] = useState(initialMax);

    const handleTextMinChange = (e) => {
        const value = Number(e.target.value)// Ensure min does not exceed max
        setMinValue(value);
        onChange({ min: value, max: maxValue }); // Trigger onChange only when slider stops
    };

    // Handle changes for maximum input

    const handleTextMaxChange = (e) => {
        const value = Number(e.target.value) // Ensure max does not go below min
        setMaxValue(value)
        onChange({ min: minValue, max: value }); // Trigger onChange only when slider stops
    };

    // Update slider values when initialMin and initialMax change
    useEffect(() => {
        setMinValue(initialMin);
        setMaxValue(initialMax);
    }, [initialMin, initialMax]);

    return (
        <div className="custom-wrapper">
            <div className="header mb-3">
                <h6 className="projtitle">{label}</h6>
            </div>

            {/* Input fields for min and max values */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <TextField
                    type="number"
                    label="Min"
                    value={minValue ? minValue : ""}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    onChange={handleTextMinChange}

                />
                <TextField
                    type="number"
                    label="Max"
                    value={maxValue ? maxValue : ""}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    onChange={handleTextMaxChange}

                />
            </div>


        </div>
    );
};

export default ExperienceSlider;
