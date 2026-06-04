
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(deepClone);
    }

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
    );
}
export const splitContentByLines = (text, charsPerLine = 50, linesPerBlock = 3) => {
    const charsPerBlock = charsPerLine * linesPerBlock;
    let result = [];
    let currentBlock = "";

    // Split text by full stops, but retain the full stops by using a regex lookahead
    const sentences = text.split(/(?<=\.)\s+/); // Split by full stop followed by a space

    sentences.forEach(sentence => {
        let remainingText = sentence;

        // Process the sentence while ensuring words aren't broken
        while (remainingText.length > 0) {
            if (remainingText.length <= charsPerBlock) {
                // If the remaining text fits within the current block, add it all
                currentBlock += remainingText;
                remainingText = "";
            } else {
                // Find the nearest space to split without breaking words
                let breakIndex = remainingText.lastIndexOf(' ', charsPerBlock);

                // If no space is found, use the next space after the block size
                if (breakIndex === -1 || breakIndex === 0) {
                    // Look forward for the next space after charsPerBlock, or just split at charsPerBlock if no space found
                    breakIndex = remainingText.indexOf(' ', charsPerBlock);

                    // If no space is found at all, just cut at charsPerBlock
                    if (breakIndex === -1) {
                        breakIndex = charsPerBlock;
                    }
                }

                // Add the chunk to the current block and remove it from remainingText
                currentBlock += remainingText.slice(0, breakIndex).trim();
                remainingText = remainingText.slice(breakIndex).trim();

                // Push the completed block to the result
                result.push(currentBlock);
                currentBlock = "";
            }
        }
    });

    // Push the last block if there's remaining text
    if (currentBlock) {
        result.push(currentBlock.trim());
    }

    return result;
};



export const processDataHideAndView = (data, config = {}) => {
    if (!data) return null;

    return Object.keys(data).reduce((acc, key) => {
        // Skip keys that are marked to be hidden
        if (config.hide?.includes(key)) {
            return acc; // Skip this key
        }

        // Check if the key is in the rename config and has both link and name fields
        const renameConfig = config.rename?.[key];
        if (renameConfig && renameConfig.link && renameConfig.name) {
            const urlKey = renameConfig.link; // The key that holds the URL
            const displayName = renameConfig.name; // The name to display in place of the key

            // If both the URL key and its corresponding name exist, add them
            if (data[urlKey] && data[key]) {
                acc[displayName] = { name: data[key], link: data[urlKey] };
            }
        } else {
            // If it's not a URL-related key, either rename or keep the original key
            const newKey = config.rename?.[key]?.name || key;
            acc[newKey] = data[key];
        }

        return acc;
    }, {});
};




export function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
export const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'russian', label: 'Russian' },
    // Add more languages as needed
];
export const jobTypes = [
    "Full-time", "Part-time", "Contract", "Temporary", "Internship", "Remote",
    "Fresher",
    "Hybrid",
    "Freelancing"
];
export const careerLevels = [
    "Fresher",
    "Staff/Assistant",
    "Junior-level",
    "Senior-level",
    "Executive/Officer",
    "Managerial",
    "Consultant",
    "AGM/DGM/GM",
    "C-level position",
    "Director/President",
    "Founder",
    "Others"
];
export const degrees = [
    'Select Degree',
    '10th', '12th',
    'Diploma',
    'Bachelors',
    'Masters',
    'PhD'];
export const employmentStatuses = [
    "College student",
    "Internship",
    "Fresher",
    "Full time Employed",
    "Part time Employed",
    "Contract-basis",
    "Remote/Work from Home",
    "Hybrid",
    "Freelancer",
    "Self-Employed",
    "Unemployed"
];
export const jobExperience = [
    { label: "Fresher", value: 0 },
    { label: "Up to 6 months", value: 0.5 },
    { label: "1+ year", value: 1 },
    { label: "2+ year", value: 2 },
    { label: "3+ year", value: 3 },
    { label: "4+ year", value: 4 },
    { label: "5 - 10 year", value: 5 },
    { label: "10+ year", value: 10 }
];

export const proficiencyLevels = ["None", "Beginner", "Intermediate", "Expert"];
export const communicationProficiency = ["None", "Beginner", "Intermediate", "Fluent"];
export const myssoaboutsources = [
    "Print Media",
    "Social Media",
    "Satsang Sabha",
    "Mahotsav",
    "Banner",
    "Saints",
    "Satsangis",
    "Relatives",
    "Family members",
    "Friends",
    "Others"
];
let date = new Date().getFullYear()
export const yearsArray = Array.from({ length: date - 1801 + 1 }, (_, i) => 1801 + i).reverse()
export const levelOptions = [
    { value: 'junior', label: 'Junior' },
    { value: 'mid', label: 'Mid' },
    { value: 'senior', label: 'Senior' },
    { value: 'lead', label: 'Lead' },
];
export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};