import * as Yup from 'yup';
const curr = new Date();
curr.setFullYear(curr.getFullYear() - 18);
const date = curr.toISOString().substring(0, 10);
import { isValidPhoneNumber } from 'react-phone-number-input';
import { addDays } from '.';

const jobPortalFormSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('First name is required')
    .min(2, 'First name is too short')
    .max(50, 'First name is too long'),
  last_name: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name is too short')
    .max(50, 'Last name is too long'),
  phone_number: Yup.string()
    .required('Phone number is required')
    .test('isValidPhoneNumber', 'Phone number is invalid', (value) => isValidPhoneNumber(value || '')),
  bio: Yup.string()
    .required('Bio is required')
    .min(10, 'Bio is too short'),
  country_id: Yup.string()
    .required('Country is required'),
  state_id: Yup.string()
    .required('State is required'),
  city_id: Yup.string()
    .required('City is required'),
  skills: Yup.array()
    .of(Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required()
    }))
    .min(1, 'At least one skill is required'),
  profilephoto: Yup.mixed()
    .required('Profile photo is required')
    .test('fileSize', 'Profile photo must be less than 2MB', value => {
      return value && value.size <= 2000000;
    })
    .test('fileType', 'Only .jpeg, .jpg, and .png files are allowed', value => {
      return value && ['image/jpeg', 'image/png'].includes(value.type);
    }),
  resume: Yup.mixed()
    .required('Resume is required')
    .test('fileSize', 'Resume must be less than 5MB', value => {
      return value && value.size <= 5000000;
    })
    .test('fileType', 'Only .pdf, .doc, and .docx files are allowed', value => {
      return value && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type);
    }),
});


const jobSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  short_description: Yup.string().nullable().label('Short Description'),  // Optional field
  salary1: Yup.number()
    .transform((value, originalValue) =>
      originalValue === '' ? null : Number(originalValue) // Handle empty string
    )
    .required('Min Salary is required')
    .min(1, 'Min Salary must be a number and at least 1')
    .typeError('Min Salary must be a valid number'), // Custom error for invalid number
  salary2: Yup.number()
    .transform((value, originalValue) =>
      originalValue === '' ? null : Number(originalValue) // Handle empty string
    )
    .required('Maximum Salary is required')
    .moreThan(Yup.ref('salary1'), 'Maximum Salary must be greater than Min Salary')
    .typeError('Maximum Salary must be a valid number'), // Custom error for invalid number
  country_id: Yup.string().required('Country is required'),
  state_id: Yup.string().required('State is required'),
  city_id: Yup.string().required('City is required'),
  min_years: Yup.number()
    .required('Min Years of Experience is required')
    .typeError('Min Years of Experience must be a number'),
  max_years: Yup.number()
    .required('Max Years of Experience is required')
    .moreThan(Yup.ref('min_years'), 'Max Years of Experience must be greater than Min Years of Experience')
    .typeError('Max Years of Experience must be a number'),
  position: Yup.number().required('Vacancy is required').typeError('Vacancy must be a number'),

  education: Yup.string().required('Education is required'),
  jobType: Yup.string().required('Job Type is required'),

  // company: Yup.string().required('Company is required'),

  tags: Yup.array().of(Yup.string()).nullable().label('Tags'),  // Optional field
  interview_process: Yup.string().required('interview process is required').label('Interview Process'),  // Optional field
  additional_instructions: Yup.string().nullable().label('Additional Instructions'),  // Optional field
  application_deadline: Yup.date()
    .required('Application Deadline is required')
    .min(
      addDays(new Date(), 29), // Adding 7 days to the current date
      'Application Deadline must be at least 7 days in the future'
    ),

  category: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  skills: Yup.array().of(Yup.string()).label('Skills'),
  requirements: Yup.string().label("Requirements"),
  benefits: Yup.array().of(Yup.string()).label('Benefits'),

  // salary_type: Yup.string().required('Salary Type is required'),

});

const PostJobValidation = (job) => {
  try {
    jobSchema.validateSync(job, { abortEarly: false });
    return null; // Return null if no error (optional, depending on how you want to handle success)
  } catch (error) {
    return error.errors[0]; // Return only the first error message
  }
};
const recruiterFormValidationSchema = Yup.object({
  // Personal Details
  personalDetails: Yup.object({
    profilephoto: Yup.mixed().required('Profile Photo is required'),
    first_name: Yup.string().required('Please enter your first name'),
    middle_name: Yup.string().required('Please enter your middle name'), // Optional field
    last_name: Yup.string().required('Please enter your last name'),
    phone: Yup.string()
      .required('Phone number is required')
      .test('is-valid-phone', 'Invalid phone number', (value) => isValidPhoneNumber(value || '')), // Custom phone validation
    currentAddress: Yup.object({
      street: Yup.string().nullable(),
      country_id: Yup.string().required('Please select your country'),
      state_id: Yup.string().required('Please select your state'),
      city_id: Yup.string().required('Please select your city'),
      zipCode: Yup.string().nullable(),
    }),
  }),

  email: Yup.string().email('Invalid email format').required('Email is required'),
  // Company Details

  company: Yup.object({
    aboutus: Yup.string().label("About Us Section")
      .test('min-words', 'About Us should be at least 50 words', function (value) {
        if (!value) return true; // Allow empty value if it's not required
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 50;
      }).required(),
    achievement: Yup.array().of(
      Yup.object({
        year: Yup.string().required('Achievement Year is required'),
        description: Yup.string().required('Achievement Description is required'),
      })
    ).nullable(),

    name: Yup.string().required('Company Name is required'),
    currentDesignation: Yup.string().required('Current Designation is required'),
    website: Yup.string().required('Please enter the company website'),
    companylogo: Yup.mixed().required('Company Logo is required').label("Logo"),
    from: Yup.number().transform((value, originalValue) =>
      originalValue === '' ? null : Number(originalValue) // Handle empty string
    ).required('Established Year is required'),

    address1: Yup.string().required('Address 1 is required'),
    address2: Yup.string().nullable().label("address 2"), // Optional field
    country_id: Yup.string().required('Country is required'),
    state_id: Yup.string().required('State/Province/Region is required'),
    city_id: Yup.string().required('City is required'),
    // totalExperience: Yup.string().required('Total Experience in hiring is required'),
    levelIHireFor: Yup.array().min(1, 'Select at least one level').required('Level I hire for is required'),
    industry: Yup.array()
      .min(1, 'Select at least one industry')
      .max(4, 'Select up to 4 industries')
      .required('Industry is required'),

    skills: Yup.array().min(1, 'Skills are required'),
  }).required("Company Details are Required"),

  // Other Fields
  termsOfService: Yup.boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
});
const personalDetailsValidationSchema = Yup.object({
  first_name: Yup.string().required('Please enter your first name'),
  middle_name: Yup.string().nullable(), // Optional field
  last_name: Yup.string().required('Please enter your last name'),
  phone: Yup.string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Invalid phone number', (value) => isValidPhoneNumber(value || '')), // Custom phone validation

  currentAddress: Yup.object({
    street: Yup.string().nullable(),
    city_id: Yup.string().required('Please select your city'),
    state_id: Yup.string().required('Please select your state'),
    zipCode: Yup.string().nullable(),
    country_id: Yup.string().required('Please select your country'),
  }),

  // email: Yup.string().email('Invalid email format').required('Email is required'),

});
const companyDetailsValidationSchema = Yup.object({
  aboutus: Yup.string().label("About Us Section")
    .test('min-words', 'About Us should be at least 50 words', function (value) {
      if (!value) return true; // Allow empty value if it's not required
      const wordCount = value.trim().split(/\s+/).length;
      return wordCount >= 50;
    }).required(),
  achievement: Yup.array().of(
    Yup.object({
      year: Yup.string().required('Achievement Year is required'),
      description: Yup.string().required('Achievement Description is required'),
    })
  ).nullable(),
  currentDesignation: Yup.string().required('Current Designation is required'),
  from: Yup.number().transform((value, originalValue) =>
    originalValue === '' ? null : Number(originalValue) // Handle empty string
  ).required('Established Year is required'),
  // to: Yup.number()
  //   .required('To Year is required')
  //   .min(Yup.ref('from'), 'To Year cannot be before From Year'),
  name: Yup.string().required('Company Name is required'),
  address1: Yup.string().required('Address 1 is required'),
  address2: Yup.string().nullable(), // Optional field
  city_id: Yup.string().required('City is required'),
  state_id: Yup.string().required('State/Province/Region is required'),
  country_id: Yup.string().required('Country is required'),
  // totalExperience: Yup.string().required('Total Experience in hiring is required'),
  levelIHireFor: Yup.array().min(1, 'Select at least one level').required('Level I hire for is required'),
  industry: Yup.array()
    .min(1, 'Select at least one industry')
    .max(4, 'Select up to 4 industries')
    .required('Industry is required'),
  website: Yup.string().required('Please enter the company website'),
  skills: Yup.array().min(1, 'Skills are required'),

});
const JobSeekervalidationSchema = Yup.object().shape({
  personalDetails: Yup.object().shape({
    profilephoto: Yup.mixed().required('Profile Photo is required'),
    first_name: Yup.string().required('First name is required'),
    middle_name: Yup.string().required('Middle Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    dateOfBirth: Yup.date()
      .required('Date of birth is required')
      .max(new Date(curr), 'You must be at least 18 years old'),
    placeOfBirth: Yup.string().required('Place of birth is required'),
    age: Yup.number().required('Age is required'),
    currentLocation: Yup.string().required('Current location is required'),
    currentAddress: Yup.object().shape({
      street: Yup.string().required('Street is required'),
      city_id: Yup.string().required('City is required'),
      state_id: Yup.string().required('State is required'),
      zipCode: Yup.string().required('Zip code is required'),
      country_id: Yup.string().required('Country is required')
    }),
    permanentAddress: Yup.object().shape({
      street: Yup.string().required('Street is required'),
      city_id: Yup.string().required('City is required'),
      state_id: Yup.string().required('State is required'),
      zipCode: Yup.string().required('Zip code is required'),
      country_id: Yup.string().required('Country is required')
    }),
    languagesKnown: Yup.array().of(Yup.string()).min(1, 'At least one language is required'),
  }),

  email: Yup.string().email('Invalid email format').required('Email is required'),
  ContactDetails: Yup.object().shape({
    phone: Yup.string()
      .required('Phone number is required')
      .test('is-valid-phone', 'Invalid phone number', (value) => isValidPhoneNumber(value || '')), // Custom phone validation

    whatsappphone: Yup.string()
      .required('Whatsapp phone number is required')
      .test('is-valid-phone', 'Invalid Whatsapp phone number', (value) => isValidPhoneNumber(value || '')), // Custom phone validation
    portfolioLink: Yup.string().url('Invalid url'),
    linkedinprofileLink: Yup.string().url('Invalid url'),

  }),
  educationDetails: Yup.array()
    .of(
      Yup.object().shape({
        degree: Yup.string().required('Degree is required'),
        institution: Yup.string().required('Institution is required'),
        yearOfCompletion: Yup.number().required('Year of completion is required'),
        percentage: Yup.number().required('Percentage is required'),
        board: Yup.string().when('degree', (degree, schema) => {
          if (degree && (degree.includes('10th') || degree.includes('12th'))) {
            return schema.required('Board is required for 10th or 12th');
          } else {
            return schema.notRequired();
          }
        })
      })
    )
    .min(1, 'Add at least one education') // This will validate if at least one object is present in the array
    .required('Education details are required'),
  employmentdetails: Yup.object().shape({
    employmentStatus: Yup.string().required('Employment Status is required'),
    experience: Yup.number().transform((value, originalValue) =>
      originalValue === '' ? null : Number(originalValue) // Handle empty string
    ).required('Experience is required'),
    jobtype: Yup.string().required('Job Type is required'),
    careerlevel: Yup.string().required('Career Level is required'),
    industry: Yup.string().required('Industry is required'),
    functionalarea: Yup.string().required('Functional area is required'),
    Specialization: Yup.string().required('Specialization is required'),
  }),


  keySkills: Yup.array().of(
    Yup.object({
      skill: Yup.string().required('Skill is required'),
      proficiency: Yup.string().required('Proficiency is required')
    })
  ),


  additionalInformation: Yup.object().shape({
    computerProficiency: Yup.string().required('Computer Knowledge Proficiency is required'),
    currentSalary: Yup.number().required('Cuurent Salary is required'),
    salaryExpectations: Yup.number().required('Expected Salary is required'),
    howdidyouhearaboutmysso: Yup.string().required('How did you hear about ShreeSSO is required'),
    resume: Yup.mixed().required('Resume is required'),
    IdProof: Yup.mixed().required('Id Proof is required'),
  }),
  communicationSkills: Yup.object({
    english: Yup.string().required('English Knowledge Proficiency is required'),
    hindi: Yup.string().required('Hindi Knowledge Proficiency is required'),
    gujarati: Yup.string().required('Gujarati Knowledge Proficiency is required'),
    marathi: Yup.string().required('Marathi Knowledge Proficiency is required'),

  }),


});
const JobSeekerEditvalidationSchema = Yup.object().shape({
  personalDetails: Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    middle_name: Yup.string().required('Middle Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    dateOfBirth: Yup.date()
      .required('Date of birth is required')
      .max(new Date(curr), 'You must be at least 18 years old'),
    placeOfBirth: Yup.string().required('Place of birth is required'),
    age: Yup.number().required('Age is required'),
    currentLocation: Yup.string().required('Current location is required'),
    currentAddress: Yup.object().shape({
      street: Yup.string().required('Street is required'),
      city_id: Yup.string().required('City is required'),
      state_id: Yup.string().required('State is required'),
      zipCode: Yup.string().required('Zip code is required'),
      country_id: Yup.string().required('Country is required')
    }),
    permanentAddress: Yup.object().shape({
      street: Yup.string().required('Street is required'),
      city_id: Yup.string().required('City is required'),
      state_id: Yup.string().required('State is required'),
      zipCode: Yup.string().required('Zip code is required'),
      country_id: Yup.string().required('Country is required')
    }),
    languagesKnown: Yup.array().of(Yup.string()).min(1, 'At least one language is required'),
  }),

  email: Yup.string().email('Invalid email format').required('Email is required'),
  ContactDetails: Yup.object().shape({
    phone: Yup.string()
      .required('Phone number is required')
      .test('is-valid-phone', 'Invalid phone number', (value) => isValidPhoneNumber(value || '')), // Custom phone validation

    whatsappphone: Yup.string()
      .required('Whatsapp phone number is required')
      .test('is-valid-phone', 'Invalid Whatsapp phone number', (value) => isValidPhoneNumber(value || '')), // Custom phone validation
    portfolioLink: Yup.string().url('Invalid url'),
    linkedinprofileLink: Yup.string().url('Invalid url'),

  }),
  educationDetails: Yup.array()
    .of(
      Yup.object().shape({
        degree: Yup.string().required('Degree is required'),
        institution: Yup.string().required('Institution is required'),
        yearOfCompletion: Yup.number().required('Year of completion is required'),
        percentage: Yup.number().required('Percentage is required'),
        board: Yup.string().when('degree', (degree, schema) => {
          if (degree && (degree.includes('10th') || degree.includes('12th'))) {
            return schema.required('Board is required for 10th or 12th');
          } else {
            return schema.notRequired();
          }
        })
      })
    )
    .min(1, 'Add at least one education') // This will validate if at least one object is present in the array
    .required('Education details are required'),
  employmentdetails: Yup.object().shape({
    employmentStatus: Yup.string().required('Employment Status is required'),
    experience: Yup.number().transform((value, originalValue) =>
      originalValue === '' ? null : Number(originalValue) // Handle empty string
    ).required('Experience is required'),
    jobtype: Yup.string().required('Job Type is required'),
    careerlevel: Yup.string().required('Career Level is required'),
    industry: Yup.string().required('Industry is required'),
    functionalarea: Yup.string().required('Functional area is required'),
    Specialization: Yup.string().required('Specialization is required'),
  }),


  keySkills: Yup.array().of(
    Yup.object({
      skill: Yup.string().required('Skill is required'),
      proficiency: Yup.string().required('Proficiency is required')
    })
  ),


  additionalInformation: Yup.object().shape({
    computerProficiency: Yup.string().required('Computer Knowledge Proficiency is required'),
    currentSalary: Yup.number().required('Cuurent Salary is required'),
    salaryExpectations: Yup.number().required('Expected Salary is required'),
    howdidyouhearaboutmysso: Yup.string().required('How did you hear about ShreeSSO is required'),
  }),
  communicationSkills: Yup.object({
    english: Yup.string().required('English Knowledge Proficiency is required'),
    hindi: Yup.string().required('Hindi Knowledge Proficiency is required'),
    gujarati: Yup.string().required('Gujarati Knowledge Proficiency is required'),
    marathi: Yup.string().required('Marathi Knowledge Proficiency is required'),

  }),


});

// Helper function to resolve the nested path in refs.current
const resolvePath = (obj, path) => {
  return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : null), obj);
};

const ShowRefmessage = (error, refs) => {
  try {
    setTimeout(() => {
      const firstError = error?.inner?.[0];
      if (firstError && firstError.path) {
        // Try to find the element by its name attribute
        const errorRef = document.querySelector(`[name='${firstError.path}']`);
        if (errorRef) {
          // Scroll to the element smoothly
          errorRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          // Fallback to scroll using refs if provided
          const refFallback = resolvePath(refs.current, firstError.path);
          if (refFallback) {
            refFallback.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    }, 0);
  } catch (error) {
    console.log("Error resolving scroll reference:", error);
  }
};


function getAllKeys(obj, prefix = '') {
  let keys = [];

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    keys.push(newKey);

    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        // Handle array
        value.forEach((item, index) => {
          if (typeof item === 'object' && item !== null) {
            keys = keys.concat(getAllKeys(item, `${newKey}[${index}]`));
          }
        });
      } else {
        // Handle nested object
        keys = keys.concat(getAllKeys(value, newKey));
      }
    }
  }

  return keys;
}

export { PostJobValidation, getAllKeys, ShowRefmessage, JobSeekervalidationSchema, JobSeekerEditvalidationSchema, jobPortalFormSchema, jobSchema, recruiterFormValidationSchema, personalDetailsValidationSchema, companyDetailsValidationSchema }
