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
  ContentIcon,
  EventsIcon,
  OverviewIcon,
  PaymentsIcon,
  VenuesIcon,
} from "@utils/svgIcons";
import { Link } from "react-router-dom";
import { axiosInstance } from "@apiClient";

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

const menuItems: MenuProps["items"] = [
  {
    key: "/dashboard/overview",
    icon: <OverviewIcon />,
    label: <Link to="/dashboard/overview">Dashboard</Link>,
  },
  {
    key: "banks",
    icon: <AnalyticsIcon />,
    label: "Banks",
    children: [
      {
        key: "/dashboard/banks/bank-accounts",
        label: (
          <Link to="/dashboard/banks/bank-accounts">Account Balances</Link>
        ),
      },
      {
        key: "/dashboard/banks/bank-payments",
        label: <Link to="/dashboard/banks/bank-payments">Bank Payments</Link>,
      },
      {
        key: "/dashboard/banks/bank-receipts",
        label: <Link to="/dashboard/banks/bank-receipts">Bank Receipts</Link>,
      },
      {
        key: "/dashboard/banks/bank-transfers",
        label: <Link to="/dashboard/banks/bank-transfers">Transfers</Link>,
      },
      {
        key: "/dashboard/banks/bank-reconcile",
        label: <Link to="/dashboard/banks/bank-reconcile">Reconcile</Link>,
      },
    ],
  },
  {
    key: "sales",
    icon: <PaymentsIcon />,
    label: "Sales",
    children: [
      {
        key: "/dashboard/sales/sales-invoices",
        label: <Link to="/dashboard/sales/sales-invoices">Invoices</Link>,
      },
      {
        key: "/dashboard/sales/receipts",
        label: <Link to="/dashboard/sales/receipts">Receipts</Link>,
      },
      {
        key: "/dashboard/sales/pdcr",
        label: (
          <Link to="/dashboard/sales/pdcr">Post Dated Cheque Received</Link>
        ),
      },
      {
        key: "/dashboard/sales/sales-all",
        label: <Link to="/dashboard/sales/sales-all">Sales All</Link>,
      },
      {
        key: "/dashboard/sales/orders",
        label: <Link to="/dashboard/sales/orders">Orders</Link>,
      },
      {
        key: "/dashboard/sales/customers",
        label: <Link to="/dashboard/sales/customers">Customers</Link>,
      },
    ],
  },
  {
    key: "purchases",
    icon: <ArticlesIcon />,
    label: "Purchases",
    children: [
      {
        key: "/dashboard/purchases/bills",
        label: <Link to="/dashboard/purchases/bills">Bills</Link>,
      },
      {
        key: "/dashboard/purchases/payments",
        label: <Link to="/dashboard/purchases/payments">Payments</Link>,
      },
      {
        key: "/dashboard/purchases/pdcr",
        label: (
          <Link to="/dashboard/purchases/pdcr">Post Dated Cheque Received</Link>
        ),
      },
      {
        key: "/dashboard/purchases/all",
        label: <Link to="/dashboard/purchases/all">Purchases All</Link>,
      },
      {
        key: "/dashboard/purchases/order",
        label: <Link to="/dashboard/purchases/order">Purchase Order</Link>,
      },
      {
        key: "/dashboard/purchases/suppliers",
        label: <Link to="/dashboard/purchases/suppliers">Suppliers</Link>,
      },
    ],
  },
  {
    key: "inventory",
    icon: <ContentIcon />,
    label: "Inventory",
    children: [
      {
        key: "/dashboard/inventory/products",
        label: <Link to="/dashboard/inventory/products">Products</Link>,
      },
      {
        key: "/dashboard/inventory/stock-adjustment",
        label: (
          <Link to="/dashboard/inventory/stock-adjustment">
            Stock Management
          </Link>
        ),
      },
    ],
  },
  {
    key: "/dashboard/reports",
    icon: <VenuesIcon />,
    label: <Link to="/dashboard/reports">Reports</Link>,
  },
  {
    key: "/dashboard/analytics",
    icon: <EventsIcon />,
    label: <Link to="/dashboard/analytics">Analytics</Link>,
  },
];
const parentKeyMap: Record<string, string> = {
  banks: "banks",
  sales: "sales",
  purchases: "purchases",
  inventory: "inventory",
};
const AdminLayout = () => {
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

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
  useEffect(() => {
  const [, , parent] = location.pathname.split("/"); 
  if (parentKeyMap[parent]) {
    setOpenKeys([parentKeyMap[parent]]);
  } else {
    setOpenKeys([]);
  }
}, [location.pathname]);

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

  const logOut = () => {
    dispatch(setUserLogout("logout"));
  };

  const Admin = () => (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        // onBreakpoint={(broken) => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
        className="pt-6"
        width="226px"
      >
        <div className="pl-4">
          <Image src={Logo} preview={false} />
        </div>

        <Menu
          mode="inline"
          items={menuItems}
          selectedKeys={[location.pathname]}
          openKeys={openKeys}
          defaultOpenKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys as string[])}
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
              <div onClick={(e) => e.preventDefault()}>
                <RiArrowDownSLine size={25} />
              </div>
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
  return user?.token ? (

    <Admin />
  ) : (
    <Navigate to={"/login"} />
  );
  // return <Admin />;
};

export default AdminLayout;
