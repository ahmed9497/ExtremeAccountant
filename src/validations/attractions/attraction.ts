import * as yup from "yup";

export const addAttractionSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  url: yup.string().required("Url is required"),
  htmlEditorDescription: yup.string().required("Description is required"),
  promoDescription: yup.string().required("Description is required"),
  metaDescription: yup.string().required("Description is required"),
  customText: yup.string().required("Custom text is required"),
  metaTitle: yup.string().required("Description is required"),
  categoryId: yup.string().required("Name is required"),
  organizerId: yup.number().required("Organizer is required"),
  price: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]+$/, "Must be only digits"),
  crossPrice: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]+$/, "Must be only digits"),
  visibility: yup.boolean(),
  showCalendarOption: yup.boolean().required("Show calendar is required"),
  isSmoke: yup.number(),
  isPhoto: yup.number(),
  isVideo: yup.number(),
  ageLimit: yup.boolean(),
  disable: yup.boolean(),
});

export const Step2Schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  showDate: yup.string().required("Show date is required"),
  showStart: yup.string().required("Show start time is required"),
  showEnd: yup.string().required("Show end time is required"),
  gateOpen: yup.string().required("Open Gate Time is required"),
  gateClose: yup.string().required("Close Gate Time is required"),
  locationId: yup.string().required("Location is required"),
  maxTickets: yup
    .string()
    .required("Max tickets is required")
    .matches(/^[0-9]+$/, "Must be only digits"),
    artistList:yup.array().of(yup.string()).required('Artist required'),
    isHideRating:yup.boolean(),
    isInfoBlockCollapsible:yup.boolean(),
    isShowAttraction:yup.boolean(),
    isSupportchart:yup.boolean(),
    isShowTicketSold:yup.boolean(),
    isShowCancelled:yup.boolean(),
    isShowVisits:yup.boolean(),
    isHideDateOnTicket:yup.boolean(),
    isShowComments:yup.boolean(),
    isShareticket:yup.boolean(),
    isShowfeedback:yup.boolean(),
    isHideDateOnList:yup.boolean(),
});
export const Step3Schema = yup.object().shape({
    name:yup.string().required('Name is required'),
    capacity:yup.string()
    .required("Capacity is required")
    .matches(/^[0-9]+$/, "Must be only digits"),
    entrance:yup.string().required('Entrance is required'),
    status:yup.string().required('Status is required'),
    // isAutoCloseSales:yup.string().required('Days is required'),
    // isOpenCloseBeforeShow:yup.string().required('Days is required'),
   
    // isForceAutoSeating:yup.string().required('Days is required'),
    // isGapProtection:yup.string().required('Days is required'),
    termAndConditions:yup.string().required('Terms and Conditions are required'),
    twoSeaterTableDiamond:yup.string().required('Two Seater Table is required'),
    fourSeaterTableGold:yup.string().required('Four Seater Table gold is required'),
    fourSeaterTablePlntinum:yup.string().required('Two Seater Table platinum is required'),
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
        quota:yup.string().required("Quota is required")
        .matches(/^[0-9]+$/, "Must be only digits"),
        noteToVisitor:yup.string().required('Note is required'),
        maxUsageCount:yup.string()
        .required("Max age is required")
        .matches(/^[0-9]+$/, "Must be only digits"),
        categoryId:yup.string().required('Category is required'),
        currencyId:yup.string().required('Currency is required'),
        attractionZoneId:yup.number().required('Zone is required'),
        });

    export const Step5Schema = yup.object().shape({
        code:yup.string().required('Code is required'),
        mapzones:yup.array().of(yup.object().shape({
          mapZoneId: yup.number().required("Map zone is required"),
            sectionName: yup.string().required("Section name is required"),
            eventPriceTypeId1: yup.number().required("Event price type 1 is required"),
            eventPriceTypeId2: yup.number().required("Event price type 2 is required"),
          }))    
    });