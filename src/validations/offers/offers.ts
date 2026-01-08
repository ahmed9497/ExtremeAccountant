import * as yup from 'yup';


export const addVoucherSchema = yup.object().shape({
    modelId:yup.string().required('Name is required'),
    modelName:yup.string().required('Model name is required'),
    showData:yup.array().of(yup.string()).required('Show is required'),
    name:yup.string().required('Name is required'),
    customTitle:yup.string().required('Custom title description is required'),
    price: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]+$/, "Must be only digits"),
    quota: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]+$/, "Must be only digits"),
    usage: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]+$/, "Must be only digits"),
 
    noteToVisitor:yup.string().required('Note to visitor is required'),
    disclaimerToVisitor:yup.string().required('Disclaimer to visitor is required'),
    termAndConditions:yup.string().required('Term and conditions to visitor is required'),
    minAge: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]+$/, "Must be only digits"),
    maxAge: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]+$/, "Must be only digits"),
    // mainImage:yup.mixed<File>().required("Image is Required"), 
});


export const addPackageSchema = yup.object().shape({
    modelId:yup.string().required('Name is required'),
    modelName:yup.string().required('Model name is required'),
    showList:yup.array().of(yup.string()).required('Show is required'),
    // priceTypeQuantity:yup.number().required('priceTypeQuantity is required'), 
    // voucherTypeQuantity:yup.number().required('voucherTypeQuantity is required'), 
    groupMembers:yup.array()
    .of(
      yup.object().shape({
        email: yup.boolean(),
        mobile: yup.boolean(),
      })
    ),
    showData:yup.array().of(
      yup.object().shape({
        voucherTypeId:yup.number().required('Voucher Type is required'),
        voucherTypeQuantity:yup.number().required('Quantity is required'),
        priceTypeQuantity:yup.number().required('Quantity is required'),
        priceTypeId:yup.number().required('PriceType is required'),
      })
    ),
    name:yup.string().required('Name is required'),
    groupId:yup.number().required('Group is required'), 
    // priceTypeId:yup.number().required('PriceType is required'), 
    // voucherTypeId:yup.number().required('Voucher Type is required'), 
    sectionId:yup.number().required('Section is required'),  
    quota:yup.string().required('Quota is required').matches(/^[0-9]+$/, "Must be only digits"),
    autoDisableDate:yup.string().required('Auto disable date is required'),   
    autoDisableTime:yup.string().required('Auto disable time is required'), 
    minCountPerOrder:yup.string().required('Min count per order is required').matches(/^[0-9]+$/, "Must be only digits"), 
    maxCountPerOrder:yup.string().required('Max countper order is required').matches(/^[0-9]+$/, "Must be only digits"), 
    openOfferTime:yup.string().required('Open offer time is required'),   
    closeOfferTime:yup.string().required('Close offertime is required'),  
    crossPrice:yup.string().required('Cross price is required'),  
    customText:yup.string().required('Custom text is required'), 
  
});