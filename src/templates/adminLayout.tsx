import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Image,
  Layout,
  Menu,
  MenuProps,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import Logo from "@assets/images/sidebarlogo.png";
import { Navigate, Outlet, useLocation } from "react-router";

import {
  AnalyticsIcon,
  ArticlesIcon,
  AttractionsIcon,
  BannersIcon,
  ContentIcon,
  EventsIcon,
  FeedIcon,
  LocationsIcon,
  OffersIcon,
  OverviewIcon,
  PaymentsIcon,
  SubscriptionsIcon,
  UsersIcon,
  VenuesIcon,
} from "@utils/svgIcons";
import { Link } from "react-router-dom";
import { axiosInstance } from "@apiClient";
import {
  articlesCategories,
  attractionCategories,
  attractionIcons,
  categories,
  cities,
  countries,
  currency,
  eventCategories,
  eventIcons,
  getArtist,
  getDays,
  getMenuIcons,
  location,
  menuCategories,
} from "@globalConstant";
import { setCommon } from "@state/common/common";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@state/store";
import { RiArrowDownSLine } from "react-icons/ri";
import { setUserLogout } from "@state/user/user";

const { Header, Content, Sider } = Layout;

const itemss = [
  {
    key: 1,
    icon: <OverviewIcon />,
    label: <Link to="/dashboard/overview">Dashboard</Link>,
  },
  {
    key: 2,
    icon: <AnalyticsIcon />,
    label: "Banks",
    children: [
      {
        key: 21,
        label: (
          <Link to="/dashboard/banks/bank-accounts">Account Balances</Link>
        ),
      },
      {
        key: 22,
        label: <Link to="/dashboard/banks/bank-payments">Bank Payments</Link>,
      },
      {
        key: 23,
        label: <Link to="/dashboard/banks/bank-receipts">Bank Receipts</Link>,
      },
      {
        key: 24,
        label: <Link to="/dashboard/banks/bank-transfers">Transfers</Link>,
      },
      {
        key: 25,
        label: <Link to="/dashboard/banks/bank-reconcile">Reconcile</Link>,
      },
    ],
  },
  {
    key: 3,
    icon: <PaymentsIcon />,
    label: "Sales",
    children: [
      {
        key: "g6",
        label: <Link to="/dashboard/sales/sales-invoices">Invoices</Link>,
      },
      {
        key: "g7",
        label: <Link to="/dashboard/sales/receipts">Receipts</Link>,
      },
      {
        key: "g8",
        label: (
          <Link to="/dashboard/sales/pdcr">Post Dated Cheque Received</Link>
        ),
      },
      {
        key: "g17",
        label: <Link to="/dashboard/sales/sales-all">Sales All</Link>,
      },
      {
        key: "g9",
        label: <Link to="/dashboard/sales/orders">Orders</Link>,
      },
      {
        key: "g16",
        label: <Link to="/dashboard/sales/customers">Customers</Link>,
      },
    ],
  },
  {
    key: 4,
    icon: <ArticlesIcon />,
    label: "Purchases",
    children: [
      {
        key: "g10",
        label: <Link to="/dashboard/purchases/bills">Bills</Link>,
      },
      {
        key: "g11",
        label: <Link to="/dashboard/purchases/payments">Payments</Link>,
      },
      {
        key: "g12",
        label: (
          <Link to="/dashboard/purchases/pdcr">Post Dated Cheque Received</Link>
        ),
      },
      {
        key: "g13",
        label: <Link to="/dashboard/purchases/all">Purchases All</Link>,
      },
      {
        key: "g14",
        label: <Link to="/dashboard/purchases/order">Purchase Order</Link>,
      },
      {
        key: "g15",
        label: <Link to="/dashboard/purchases/suppliers">Suppliers</Link>,
      },
    ],
  },
  {
    key: 5,
    icon: <ContentIcon />,
    label: "Inventory",
    children: [
      {
        key: 16,
        label: <Link to="/dashboard/inventory/products">Products</Link>,
      },
      {
        key: 17,
        label: (
          <Link to="/dashboard/inventory/stock-adjustment">
            Stock Management
          </Link>
        ),
      },
    ],
  },
  {
    key: 6,
    icon: <VenuesIcon />,
    label: "Reports",
  },
  {
    key: 7,
    icon: <EventsIcon />,
    label: "Analytics",
  },
  // {
  //   key: 8,
  //   icon: <AttractionsIcon />,
  //   label: <Link to="/dashboard/attractions">Attractions</Link>,
  // },
  // {
  //   key: 9,
  //   icon: <OffersIcon />,
  //   label: <Link to="/dashboard/offers">Offers</Link>,
  // },
  // {
  //   key: 10,
  //   icon: <FeedIcon />,
  //   label: <Link to="/dashboard/feed">Feed</Link>,
  // },
  // {
  //   key: 11,
  //   icon: <UsersIcon />,
  //   label: <Link to="/dashboard/users">Users</Link>,
  // },
  // {
  //   key: 12,
  //   icon: <LocationsIcon />,
  //   label: <Link to="/dashboard/locations">Locations</Link>,
  // },
  // {
  //   key: 13,
  //   icon: <BannersIcon />,
  //   label: <Link to="/dashboard/banners">Banners</Link>,
  // },
  // {
  //   key: 14,
  //   icon: <SubscriptionsIcon />,
  //   label: <Link to="/dashboard/subscriptions">Subscriptions</Link>,
  //   path: "/subs",
  // },
];
const routes = [
  "overview",
  "analytics",
  "payments",
  "articles",
  "content",
  "venues",
  "events",
  "attractions",
  "offers",
  "feed",
  "users",
  "locations",
  "banners",
  "subscriptions",
];
const AdminLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const route = useLocation();
  const [selectedKeys, setSelectedkeys] = useState(["4"]);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button type="link" className="text-red-500" onClick={() => logOut()}>
          Logout
        </Button>
      ),
    },
  ];
  // useEffect(() => {
  //      const getCommons = () => {
  //     Promise.all([
  //       axiosInstance.get(cities),
  //       axiosInstance.get(categories),
  //       axiosInstance.get(location),
  //       axiosInstance.get(getDays),
  //       axiosInstance.get(currency),
  //       axiosInstance.get(articlesCategories),
  //       axiosInstance.get(menuCategories),
  //       axiosInstance.get(getMenuIcons),
  //       axiosInstance.get(eventCategories),
  //       axiosInstance.get(eventIcons),
  //       axiosInstance.get(getArtist),
  //       axiosInstance.get(attractionCategories),
  //       axiosInstance.get(attractionIcons),
  //       axiosInstance.get(countries),
  //     ]).then((values) => {
  //       console.log(values);
  //       if (values.length) {
  //         const payload = {
  //           cities: values[0].data,
  //           categories: values[1].data,
  //           locations: values[2].data.list,
  //           days: values[3].data,
  //           currencies: values[4].data,
  //           articlesCategories: values[5].data,
  //           menuCategories: values[6].data,
  //           menuIcons: values[7].data,
  //           eventCategories: values[8].data,
  //           eventIcons: values[9].data,
  //           artists: values[10].data,
  //           attractionCategories: values[11].data,
  //           attractionIcons: values[12].data,
  //           countries: values[13].data,
  //         };
  //         dispatch(setCommon(payload));
  //       }
  //     });
  //   };
  //   if (user?.user?.tokens?.accessToken) {
  //     getCommons();
  //   }
  // }, []);
  useEffect(() => {
    const a = route.pathname;
    const parts = a.split("/"); // Split the string by '/'
    const loc = parts[parts.length - 1];
    const index = routes.findIndex((i: any) => i === loc);
    // setSelectedkeys(['21']);
  }, [route]);

  const logOut = () => {
    dispatch(setUserLogout("logout"));
  };

  const Admin = () => (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        className="pt-6"
        width="226px"
      >
        <div className="pl-4">
          <Image src={Logo} preview={false} />
        </div>

        <Menu
          mode="inline"
          // defaultSelectedKeys={["6"]}
          // selectedKeys={selectedKeys}
          items={itemss}
          // onClick={(e: any) => console.log(e)}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, height: 60, background: colorBgContainer }}
        >
          <Flex justify="end" gap={10} align="center" className="px-4 ">
            <div className="text-[14px] text-[#6F7070]">
              {user?.user?.name || "Your Name"}
            </div>
            <Avatar
              size={30}
              src={
                user?.user?.userData?.photo ||
                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              }
            />
            {/* <RiArrowDownSLine size={25}/> */}

            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <RiArrowDownSLine size={25} />
              </a>
            </Dropdown>
          </Flex>
        </Header>
        <Content className="p-4">
          {/* <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        > */}
          <Outlet />
          {/* </div> */}
        </Content>
      </Layout>
    </Layout>
  );
  // return user?.user?.tokens?.accessToken ? (
  // return user?.user?.name ? (
  //   <Admin />
  // ) : (
  //   <Navigate to={"/login"} />
  // );
  return <Admin />;
};

export default AdminLayout;
