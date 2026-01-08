import * as yup from 'yup';

export const Step1Schema = yup.object().shape({
  title: yup.string().required('Venue name is required'),
  categoryId: yup.string().required('Kind Of Venue is required'),
  cityId: yup.string().required('Location is required'),
  description: yup.string().required('Description is required'),
  timeFormat: yup.string().required('Time Format is required'),
  startTime: yup.string().required('Start Time is required'),
  endTime: yup.string().required('End Time is required'),
  totalTable: yup.string().required('Total Table is required'),
  totalSeat: yup.string().required('Total Seat is required'),
  security: yup.string().required('Security is required'),
  });
export const Step2Schema = yup.object().shape({
  date : yup.string().required('Date is required'),
  startTime: yup.string().required('Start Time is required'),
  endTime: yup.string().required('End Time is required'),
  openGateTime: yup.string().required('Open Gate Time is required'),
  closeGateTime: yup.string().required('Close Gate Time is required'),
  timeFormat: yup.string().required('Time Format is required'),
  dayIds: yup.string().required('Days is required')
  
  });
export const Step3Schema = yup.object().shape({
  zoneName:yup.string().required('Zone is required'),
  status:yup.string().required('Status is required'),
  // isAutoCloseSales:yup.string().required('Days is required'),
  // isOpenCloseBeforeShow:yup.string().required('Days is required'),
  dateTime:yup.string().required('Date Time is required'),
  openTime:yup.string().required('Open Time is required'),
  closeTime:yup.string().required('Close Time is required'),
  // isForceAutoSeating:yup.string().required('Days is required'),
  // isGapProtection:yup.string().required('Days is required'),
  termAndConditions:yup.string().required('Terms and Conditions are required'),
  twoSeaterTableDiamond:yup.string().required('Two Seater Table is required'),
  fourSeaterTableGold:yup.string().required('Four Seater Table gold is required'),
  fourSeaterTablePlatinum:yup.string().required('Two Seater Table platinum is required'),
  minAge:yup.string()
  .required("Min age is required")
  .matches(/^[0-9]+$/, "Must be only digits"),
  maxAge:yup.string()
  .required("Max age is required")
  .matches(/^[0-9]+$/, "Must be only digits"),
  
  
  });
export const Step4Schema = yup.object().shape({
  name:yup.string().required('Name is required'),
  price:yup.string().required('Price is required'),
  quota:yup.string().required('Quota is required'),
  bookingPricePerPerson:yup.string().required('Booking per person is required'),
  noteToVisitor:yup.string().required('Note is required'),
  maxUsageCount:yup.string()
  .required("Max usage count is required")
  .matches(/^[0-9]+$/, "Must be only digits"),
  venueZoneId:yup.string().required('Zone is required'),
  currencyId:yup.string().required('Currency is required'),
  });
export const Step5Schema = yup.object().shape({
  name : yup.string().required('Name is required'),
  customTitle : yup.string().required('Custom Title is required'),
  price : yup.string().required('Price is required').matches(/^[0-9]+$/, "Must be only digits"),
  quota : yup.string().required('Quota is required').matches(/^[0-9]+$/, "Must be only digits"),
  usage : yup.string().required('Usage is required').matches(/^[0-9]+$/, "Must be only digits"),
  noteToVisitor : yup.string().required('Note to visitor is required'),
  minAge:yup.string()
  .required("Min age is required")
  .matches(/^[0-9]+$/, "Must be only digits"),
  maxAge:yup.string()
  .required("Max age is required")
  .matches(/^[0-9]+$/, "Must be only digits"),
  
  disclaimerToVisitor : yup.string().required('Disclaimer to visitor is required'),
  termAndConditions : yup.string().required('Terms and conditions is required')

  });
export const Step6Schema = yup.object().shape({
  priceTypeQuantity:yup.number().required('priceTypeQuantity is required'), 
  voucherTypeQuantity:yup.number().required('voucherTypeQuantity is required'), 
  groupMembers:yup.array()
  .of(
    yup.object().shape({
      email: yup.boolean(),
      mobile: yup.boolean(),
    })
  ),
  name:yup.string().required('Name is required'),
  groupId:yup.number().required('Group is required'), 
  priceTypeId:yup.number().required('PriceType is required'), 
  voucherTypeId:yup.number().required('Voucher Type is required'), 
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
  status:yup.boolean(), 
  ageLimitVisibility:yup.boolean(), 
  mobileApp:yup.boolean(), 
  saleConsole:yup.boolean(), 
  site:yup.boolean(), 
  permission:yup.boolean(), 
  partnerCompany:yup.boolean(), 
  cardNumber:yup.boolean(), 
  promoCode:yup.boolean(), 
  binNumber:yup.boolean(), 
  binNumberCompany:yup.boolean(), 
  isAcceleration:yup.boolean(), 

  });
export const Step7Schema = yup.object().shape({
menuCategoryId:yup.string().required('Category is required'), 
menuSubCategoryId:yup.string().required('Sub category is required'), 
name:yup.string().required('Name is required'), 
description:yup.string().required('Description is required'), 
composition:yup.string().required('Composition is required'), 
price:yup.string().required('Price is required').matches(/^[0-9]+$/, "Must be only digits"),
weight:yup.string().required('Weight is required').matches(/^[0-9]+$/, "Must be only digits"),
MenuItems:yup.array().of(yup.string()).required('MenuItems is required'), 
image:yup.mixed<File>().required("Image is Required"), 
 
});
export const Step8Schema = yup.object().shape({ 
title:yup.string().required('Name is required'), 
description:yup.string().required('Description is required'), 
mediaTypeId:yup.string().required('media id is required'), 
image:yup.mixed<File>().required("Image is Required"), 
 
});
export const sectionModalSchema = yup.object().shape({ 
  name:yup.string().required('Name is required'), 
  unfoldGroupCount:yup.string()
  .required("Unfold group count is required")
  .matches(/^[0-9]+$/, "Must be only digits")
 
});
export const groupModalSchema = yup.object().shape({ 
  sectionId:yup.number().required('Section is required'), 
  name:yup.string().required('Name is required'), 
  groupDescription:yup.string().required("Description is required"),
  customAccelerationText:yup.string().required("Custom text is required"),
  members:yup.array().min(1).required('Members are required')
 
});
