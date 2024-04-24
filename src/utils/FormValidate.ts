//TODO: To generate the copy of form object to validate the errors ---
export function generateErrorInitialState(formData: any) {
  const generateErrorStructure = (data: any): any => {
    if (Array.isArray(data)) {
      return data.map((item: any) => generateErrorStructure(item));
    } else if (typeof data === "object" && data !== null) {
      const errorStructure: any = {};
      for (const key in data) {
        if (Array.isArray(data[key])) {
          errorStructure[key] = data[key].map((item: any) => generateErrorStructure(item));
        } else {
          errorStructure[key] = "";
        }
      }

      return errorStructure;
    } else {
      return "";
    }
  };

  return generateErrorStructure(formData);
}

//TODO: To make generative fields for single use of focus & blur error ---
export const generativeFieldErrorCheck = (prevErrors: any, fieldName: any, value: any, index: number) => {
  const updatedFireArms = Array.isArray(prevErrors.fireArms)
    ? prevErrors.fireArms.map((armsError: any, i: number) =>
      i === index
        ? {
          ...armsError,
          [fieldName]: value === "" ? `${fieldName} is required` : "",
        }
        : armsError,
    )
    : [];

  return { ...prevErrors, fireArms: updatedFireArms };
};

//TODO: To make generative fields for multi type of same looking fields use of focus & blur error ---
export const generativeFieldErrorCheckForManyTypes = (prevErrors: any, fieldName: any, value: any, index: number, fieldType: string) => {
  const updatedField = Array.isArray(prevErrors[fieldType])
    ? prevErrors[fieldType].map((fieldError: any, i: number) =>
      i === index
        ? {
          ...fieldError,
          [fieldName]: value === "" ? `${fieldName} is required` : "",
        }
        : fieldError,
    )
    : [];

  return { ...prevErrors, [fieldType]: updatedField };
};

//TODO: Get the fields here to check it and for validate ---

// const validateForm = (formData: any) => {
//   const errors: any = {};

//   if (!formData || typeof formData !== 'object') {

//     return errors;
//   }

//   const emailPattern: any = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//   const contactPattern: any = /^\d{10}$/;
//   const namePattern: any = /^[A-Za-z]{3,}$/;
//   const pincodePattern: any = /^\d{6}$/;

//   const calculateAge = (dob: string) => {
//     const today = new Date();
//     const birthDate = new Date(dob);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();

//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }

//     return age;
//   };

//   Object.keys(formData).forEach((field) => {
//     if (Array.isArray(formData[field]) && formData[field].length > 0 && typeof formData[field][0] === 'object') {
//       const arrayErrors = formData[field].map((item: any) => validateForm(item));
//       const hasArrayErrors = arrayErrors.some((itemErrors: any) => Object.values(itemErrors).some(Boolean));

//       if (hasArrayErrors) {
//         errors[field] = arrayErrors;
//       } else {
//         errors[field] = '';
//       }
//     } else if (typeof formData[field] === 'object') {
//       errors[field] = validateForm(formData[field]);
//     } else if (formData[field] === '') {
//       errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
//     } else if (field === 'email' && !emailPattern.test(formData[field])) {
//       errors[field] = 'Invalid email format';
//     } else if ((field === 'contactNumber' || field === 'alternateContactNumber') && (!(/^\d{10}$/.test(formData[field].toString())))) {
//       errors[field] = 'Invalid contact number format. Please enter exactly 10 digits';
//     } else if ((field === 'firstName' || field === 'lastName') && !namePattern.test(formData[field])) {
//       errors[field] = 'Minimum 3 characters required';
//     } else if (field === 'pincode' && !pincodePattern.test(formData[field])) {
//       errors[field] = 'Invalid pin code format';
//     } else if (field === 'dateOfBirth') {
//       const age = calculateAge(formData[field]);
//       if (age < 15) {
//         errors[field] = 'Minimum age requirement is 15 years';
//       } else {
//         errors[field] = '';
//       }
//     } else {
//       errors[field] = '';
//     }
//   });

//   return errors;
// };

const validateForm = (formData: any) => {
  const errors: any = {};

  const formatFieldName = (fieldName: string) => {
    return fieldName.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (str) => str.toUpperCase());
  };

  if (!formData || typeof formData !== "object") {
    return errors;
  }

  const emailPattern: any = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const contactPattern: any = /^\d{10}$/;
  const namePattern: any = /^[A-Za-z]{3,}$/;
  const pincodePattern: any = /^\d{6}$/;
  const aadharPattern: any = /^\d{12}$/;

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  Object.keys(formData).forEach((field) => {
    const formattedField = formatFieldName(field);

    if (Array.isArray(formData[field]) && formData[field].length > 0 && typeof formData[field][0] === "object") {
      const arrayErrors = formData[field].map((item: any) => validateForm(item));
      const hasArrayErrors = arrayErrors.some((itemErrors: any) => Object.values(itemErrors).some(Boolean));

      if (hasArrayErrors) {
        errors[field] = arrayErrors;
      } else {
        errors[field] = "";
      }
    } else if (typeof formData[field] === "object") {
      errors[field] = validateForm(formData[field]);
    } else if (formData[field] === "") {
      errors[field] = `${formattedField} is required`;
    } else if (field === "email" && !emailPattern.test(formData[field])) {
      errors[field] = "Invalid email format";
    }
    else if ((field === "contactNumber" || field === "alternateContactNumber") && !/^\d{10}$/.test(formData[field].toString())) {
      errors[field] = "Invalid contact number format. Please enter exactly 10 digits";
    }
    // else if ((field === "contactNumber" || field === "alternateContactNumber") && (!/^\d{10}$/.test(formData[field].toString()) || /^(.)\1{9}$/.test(formData[field].toString()))) {
    //   errors[field] = "Invalid contact number format. Please enter exactly 10 digits with different digits.";
    // }
    else if ((field === "firstName" || field === "lastName") && !namePattern.test(formData[field])) {
      errors[field] = "Minimum 3 characters required";
    } else if (field === "aadhar" && !aadharPattern.test(formData[field].toString())) {
      errors[field] = "Invalid Aadhar number format. Please enter exactly 12 digits";
    } else if (field === "pincode" && !pincodePattern.test(formData[field])) {
      errors[field] = "Invalid pin code format";
    } else if (field === "dateOfBirth") {
      const age = calculateAge(formData[field]);
      if (age < 15) {
        errors[field] = "Minimum Age Requirement is 15 years";
      } else {
        errors[field] = "";
      }
    } else {
      errors[field] = "";
    }
  });

  return errors;
};

export default validateForm;

/* 
    else if (field === 'passportNumber' && !passportPattern.test(formData[field])) {
      errors[field] = 'Invalid passport number format';
    }
*/
