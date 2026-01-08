import { ThemeConfig } from "antd";

const config: ThemeConfig = {
    token: {
      colorPrimary: '#04090C',
      // boxShadow:'0 0px 0 rgba(1, 6, 8, 0.72)'
      fontFamily: 'Inter',
      
    },
    components: {
        Layout: {
            siderBg:'#04090C',            
        },
      Button: {
        primaryShadow: "none"
      },
      Input: {
        colorPrimary: '#eb2f96',
        controlHeight: 40,
        // colorBgContainer:"#EEEEEEB2",
        borderRadius:2
      },
      Select: {
        controlHeight: 40,
        optionSelectedColor: "white",
        colorIcon:'white',
        borderRadius:3
      },
      Menu:{
        colorBgContainer:'#04090C',
        itemSelectedColor:'#04090C',
        itemSelectedBg:'#FAFAFA',
        colorText:'#9D9D9D',
        subMenuItemSelectedColor:"white",
        
        // darkItemColor:'#ffffff'
      },
      Steps: {
        colorPrimary: "rgb(255, 255, 255)",
        colorText: "rgb(0, 0, 0)",
        colorTextLightSolid: "rgb(0, 0, 0)",
        colorBorderSecondary: "rgb(0, 0, 0)",
        colorPrimaryBorder: "#04090C",
        // finishIconBorderColor: "rgb(8, 8, 8)",       
        lineWidth:3,
        fontSizeLG:14,
        iconTop:-2,
        controlHeight:32,
        titleLineHeight:10
      },
      Table: {
        headerColor:"#757575",
        fontWeightStrong:400,
        colorText:"#04090C"
        // rowSelectedBg: "#aeb0b1",
        // rowHoverBg:"#fafafa"
      },
      Modal: {
        fontWeightStrong:400,
        fontSizeHeading5: 30,
        contentBg:"rgba(250, 250, 250, 1)",
        headerBg:"transparent"
      },
      DatePicker: {
        controlHeight: 50
      },
      Upload: {
        colorFillAlter: "rgb(255, 255, 255)"
      },
      Switch:{
        trackMinWidth: 40,
        trackHeight:24,
        handleSize:20,
        handleBg:'rgba(178, 173, 173, 1)',
        colorPrimary:"rgba(255, 255, 255, 1)",
        colorTextQuaternary:"rgba(255, 255, 255, 1)",
        trackPadding:1,
        colorPrimaryHover:"white"
      }
    
    },
  };
export default config;