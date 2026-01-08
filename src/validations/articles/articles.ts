import * as yup from 'yup';


export const addArticleSchema = yup.object().shape({
    categoryId:yup.string().required('Name is required'),
    headline:yup.string().required('Headline is required'),
    meta_title:yup.string().required('Meta title is required'),
    meta_description:yup.string().required('Meta description is required'),
    mainImage:yup.mixed<File>().required("Image is Required"), 
    })
export const addbankAccount = yup.object().shape({
    bank:yup.string().required('Name is required'),
    code:yup.string().required('Headline is required'),
    description:yup.string().required('Description is required')  
    })
export const addCustomer = yup.object().shape({
    businessName:yup.string().required('businessName is required'),
    email:yup.string().required('email is required'),
    firstName:yup.string().required('firstName is required'),  
    lastName:yup.string().required('lastName is required'),  
    mobile:yup.string().required('mobile is required'),  
    phone:yup.string().required('phone is required'),  
    accountNo:yup.string().required('accountNo is required'),  
    website:yup.string().required('phone is required'),  
    })
export const addSupplier = yup.object().shape({
    businessName:yup.string().required('businessName is required'),
    email:yup.string().required('email is required'),
    firstName:yup.string().required('firstName is required'),  
    lastName:yup.string().required('lastName is required'),  
    mobile:yup.string().required('mobile is required'),  
    phone:yup.string().required('phone is required'),  
    accountNo:yup.string().required('accountNo is required'),  
    website:yup.string().required('phone is required'),  
    })
export const addbankPayment = yup.object().shape({
    bank:yup.string().required('Name is required'),
    code:yup.string().required('Headline is required'),
    description:yup.string().required('Description is required')  
    })
export const addWhtPayment = yup.object().shape({
    bank:yup.string().required('Name is required'),
    code:yup.string().required('Headline is required'),
    description:yup.string().required('Description is required')  
    })
    export const addNonStockProduct = yup.object().shape({
    bank:yup.string().required('Name is required'),
    code:yup.string().required('Headline is required'),
    description:yup.string().required('Description is required')  
    })