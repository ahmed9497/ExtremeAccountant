export type StepProps = {
    modalVisible: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    submitData: () => void;
    settingCurrencyId?: (id:number) => void;

    currencyId?: number ;
    zones?:any,
    editData?:any
  };
export type EventModalStepProps = {
    modalVisible: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    submitData: () => void;
    settingCurrencyId?: (id:number) => void;
    eventId: number ;
    currencyId?: number ;
    zones?:any;
    editData?:any

  };
export type AttractionModalStepProps = {
    modalVisible: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    submitData: () => void;
    settingCurrencyId?: (id:number) => void;
    attractionId: number ;
    currencyId?: number ;
    zones?:any;
    editData?:any

  };
  export type Props = {
    venueId: number;
    currencyId?: number;
    settingCurrencyId?:(id:number)=>void;
  };
  export type EventProps = {
    eventId: number;
    currencyId?: number;
    settingCurrencyId?:(id:number)=>void;
  };
  export type AttractionProps = {
    attractionId: number;
    currencyId?: number;
    settingCurrencyId?:(id:number)=>void;
  };
export type InnerModal = {
  sectionModal?: boolean;
  groupModal?: boolean;
  handleCancelSectionModal?: () => void;
  handleOkSectionModal?: () => void;
  handleOkGroupModal?: () => void;
  handleCancelGroupModal?: () => void;
  submitDataSection?: () => void;
  submitDataGroup?: () => void;
  venueId?: number | undefined;
  modelId?: number | undefined;
  modelName?: string | undefined;
  sections?:any
}  
export type LocationModalProps = {
  modalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  submitData: () => void;
  editData?:any
};