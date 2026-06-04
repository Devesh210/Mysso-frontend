const scrollToError = (errorPath) => {
    console.log("errorPath", errorPath)
    const errorField = document.querySelector(`[name="${errorPath}"]`); // Select the element by name
    if (errorField) {
        errorField.scrollIntoView({ behavior: 'smooth' });
        errorField.focus(); // Optional: Set focus on the field after scrolling
    }
};
const keyify = (obj, prefix = '') =>
    Object.keys(obj).reduce((res, el) => {
        if (Array.isArray(obj[el])) {
            return res;
        } else if (typeof obj[el] === 'object' && obj[el] !== null) {
            return [...res, ...keyify(obj[el], prefix + el + '.')];
        }
        return [...res, prefix + el];
    }, []);
const handleValidationErrors = (errors, path = '') => {
    // Get the first error field
    const firstErrorKey = Object.keys(errors)[0];

    if (!firstErrorKey) return; // If there are no errors, exit

    const firstErrorValues = errors[firstErrorKey]; // Get the first error field

    if (Array.isArray(firstErrorValues)) {
        const index = firstErrorValues.findIndex(item => item !== undefined);

        if (index !== -1) {
            const filteredValue = firstErrorValues.filter(item => item !== undefined);
            const firstFilteredValue = filteredValue[0];

            if (firstFilteredValue && typeof firstFilteredValue === 'object') {
                const objectPath = Object.keys(firstFilteredValue)[0];
                path += `${firstErrorKey}[${index}].${objectPath}`;
            } else {
                path += `${firstErrorKey}[${index}]`;
            }
        }
    } else if (typeof firstErrorValues === 'object') {
        // If the value is an object, recursively check its keys
        handleValidationErrors(firstErrorValues, path + `${firstErrorKey}.`);
        return; // Return here to prevent further execution
    } else {
        path += firstErrorKey; // For primitive values
    }

    console.log("Error path:", path);
    scrollToError(path); // Scroll to the first error
};
const handleFormError = (validateForm) => validateForm().then(errors => handleValidationErrors(errors))
export { handleFormError }