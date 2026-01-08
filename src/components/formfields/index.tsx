import {
  Checkbox,
  Col,
  DatePicker,
  Input,
  Radio,
  Row,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { Fragment } from "react";
import { Controller } from "react-hook-form";

export const InputBox = (props: any) => {
  const { name, control, placeholder, label, error } = props;
  return (
    <Fragment>
      <label className="text-[14px] font-normal ">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => <Input {...field} {...props} placeholder={placeholder} />}
      />
      <p className="text-red-500 text-xs py-1">{error}</p>
    </Fragment>
  );
};
export const TextAreaBox = (props: any) => {
  const { name, control, placeholder, label, rows, error } = props;
  return (
    <Fragment>
      <label className="text-[14px] font-normal">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextArea rows={rows} {...field} placeholder={placeholder} />
        )}
      />
      <p className="text-red-500 text-xs py-1">{error}</p>
    </Fragment>
  );
};
export const SelectBox = (props: any) => {
  const { name, control, options, placeholder, label, error } = props;
  return (
    <Fragment>
      <label className="text-[14px] font-normal">{label}</label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            {...props}
            placeholder={placeholder}
            style={{ width: "100%" }}
            options={options}
          ></Select>
        )}
      />
      <p className="text-red-500 text-xs py-1">{error}</p>
    </Fragment>
  );
};
export const TreeSelectBox = (props: any) => {
  const { name, control, options, placeholder, label, error } = props;
  return (
    <Fragment>
      <label className="text-[14px] font-normal">{label}</label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          
          <TreeSelect
                  {...field}
                  style={{ width: "100%" }}
                  treeData={options}
                  // value={valueL}
                  // onChange={(e) => setValueL(e)}
                  treeCheckable={true}
                  // showCheckedStrategy= {SHOW_PARENT},
                  placeholder={placeholder}
                />
        )}
      />
      <p className="text-red-500 text-xs py-1">{error}</p>
    </Fragment>
  );
};
export const SwitchBox = (props: any) => {
  const { name, control, error } = props;
  return (
    <Fragment>
      {/* <label className="text-[14px] font-normal">{label}</label> */}

      <Controller
        control={control}
        name={name}
        render={({ field }) => <Switch {...field} {...props}/>}
      />
      <p className="text-red-500 text-xs py-1">{error}</p>
    </Fragment>
  );
};
export const DatePickerBox = (props: any) => {
  const { name, control, type, label, error, showTime } = props;
  return (
    <Fragment>
      <label className="text-[14px] font-normal">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            showSecond={false}
            showTime={showTime ? true : false}
            {...field}
            picker={type}
            className="w-full"
            value={field.value ? dayjs(field.value) : null}
          />
        )}
      />
      <p className="text-red-500 text-xs py-1">{error}</p>
    </Fragment>
  );
};
export const CheckBoxField = (props: any) => {
  const { name, control, label, error } = props;
  return (
    <Fragment>
      {/* <label className="text-[14px] font-normal">{label}</label> */}

      <Controller
        control={control}
        name={name}
        render={({ field }) => 
        <Checkbox
        checked={field.value ? field.value : false}

         {...field}
         >
          {label}
          </Checkbox>}
      />
      <p className="text-red-500 text-xs py-1">{error}</p>
    </Fragment>
  );
};
export const RadioGroupBox = (props: any) => {
  const { name, control, label, error, btns } = props;
  return (
    <Fragment>
      <label className="text-[14px] font-normal">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={true}
        render={({ field }) => (
          <Radio.Group
            {...field}
            className="w-full"
            defaultValue={true}
            size="large"
          >
            <Row gutter={10}>
              {btns.map((i: any,index:number) => (
                <Col span={12} key={index}>
                  <Radio.Button
                    className="r-btns px-1 w-full rounded"
                    value={i.value}
                  >
                    {i.label}
                  </Radio.Button>
                </Col>
              ))}
             
            </Row>
          </Radio.Group>
        )}
      />
      <p className="text-red-500 text-xs py-1">{error}</p>
    </Fragment>
  );
};
