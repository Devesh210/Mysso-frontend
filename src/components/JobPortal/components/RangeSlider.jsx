import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

const RangeSlider = ({ label, onChange }) => {
    const { minSalary, maxSalary } = useSelector((state) => state.job);

    const [minValue, setMinValue] = useState(minSalary || "");
    const [maxValue, setMaxValue] = useState(maxSalary || "");
    const [error, setError] = useState({ min: "", max: "" });

    useEffect(() => {
        // Update state when Redux values change
        setMinValue(minSalary || "");
        setMaxValue(maxSalary || "");
        setError({ min: "", max: "" });
    }, [minSalary, maxSalary]);

    const validate = () => {
        let isValid = true;
        let minError = "";
        let maxError = "";

        if (minValue === "") {
            minError = "Minimum value is required";
            isValid = false;
        } else if (Number(minValue) > Number(maxValue)) {
            minError = "Minimum value cannot exceed maximum value";
            isValid = false;
        }

        if (maxValue === "") {
            maxError = "Maximum value is required";
            isValid = false;
        } else if (Number(maxValue) < Number(minValue)) {
            maxError = "Maximum value cannot be less than minimum value";
            isValid = false;
        }

        setError({ min: minError, max: maxError });
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onChange({ minValue, maxValue }); // Pass the valid values to the parent component
        }
    };

    return (
        <div className="custom-wrapper">
            <div className="header">
                <h6 className="projtitle">{label}</h6>
            </div>

            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Box sx={{ mr: 1 }}>
                    <TextField
                        label="Min"
                        type="number"
                        placeholder="Minimum"
                        value={minValue}
                        onChange={(e) => setMinValue(e.target.value)}
                        error={Boolean(error.min)}
                        helperText={error.min}
                        variant="outlined"
                        size="small"
                    />
                </Box>
                <Box sx={{ mr: 1 }}>To</Box>
                <Box sx={{ mr: 1 }}>
                    <TextField
                        label="Max"
                        type="number"
                        placeholder="Maximum"
                        value={maxValue}
                        onChange={(e) => setMaxValue(e.target.value)}
                        error={Boolean(error.max)}
                        helperText={error.max}
                        variant="outlined"
                        size="small"
                    />
                </Box>
                <Box>
                    <Button className="enterjobsclear" onClick={handleSubmit} variant="contained">
                        Enter
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default RangeSlider;
