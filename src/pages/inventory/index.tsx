import { Col, Divider, Flex, Radio, RadioChangeEvent, Row, Steps } from "antd";
import { useState } from "react";



import { Outlet } from "react-router";




const Inventory = () => {
  const [current, setCurrent] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setCurrent(e.target.value);
  };
  // const getList = async () => {
  //   try {
  //     const res: any = await axiosInstance.get(`${getPlugins}/${eventId}`);
  //     if (res?.code === 200) {

  //       setData(res.data);
  //     }
  //   } catch (error: any) {
  //     console.log("error", error);
  //   }
  // };
  return (
    <div>
      <h1 className="text-4xl font-extrabold flex items-center gap-2">
        Inventory
      </h1>
     
    
      <Divider />

      <div className="mt-10">


     <Outlet/>
      </div>
    </div>
  );
};

export default Inventory;
