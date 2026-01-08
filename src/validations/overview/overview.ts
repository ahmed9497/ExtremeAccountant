import * as yup from 'yup';

export const addRoleSchema = yup.object().shape({
   
  
    name:yup.string().required('Name is required'),
   
  
});
export const addAdminInfoSchema = yup.object().shape({
   
  
    fullName:yup.string().required('Name is required'),
    address:yup.string().required('address is required'),
    countryId:yup.number().required('Country is required'),
    poBox:yup.string().required('PO. Box is required'),
    phone:yup.string().required('Phone is required'),
    state:yup.string().required('State is required'),
   
  
});
export const addAdminAccountSchema = yup.object().shape({
   
  
    email:yup.string().required('Email is required'),
    password:yup.string().required('Password is required'),
    confirmPassword:yup.string().required('Confirm password is required'),
    roleId:yup.number().required('Role is required'),
    
   
  
});