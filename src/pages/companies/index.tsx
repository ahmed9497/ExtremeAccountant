import { axiosInstance } from "@apiClient";
import { setUserLogout } from "@state/user/user";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCompanies } from "@globalConstant";
import { RootState } from "@state/store";
import { useNavigate } from "react-router";
import { setCompany } from "@state/common/common";
type Company = {
  id: number;
  name: string;
  status: "trial" | "active" | "expired";
};

const statusStyles = {
  trial: "text-orange-500 bg-orange-50",
  active: "text-green-600 bg-green-50",
  expired: "text-red-500 bg-red-50",
};

export default function Company() {
  const [companiesData, setCompaniesData] = useState<Company[]>([
    { id: 1, name: "test", status: "expired" },
    { id: 2, name: "LevoraCraft", status: "trial" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const dispatch = useDispatch();
  const { user }: any = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  // console.log(user)
  useEffect(() => {
    const getCompanies = async () => {
      const res = await axiosInstance.get(`/${userCompanies}`);
      console.log(res);
      setCompaniesData(res.data);
    };
    if (user?.id) {
      getCompanies();
    }
  }, []);
  const createCompany = async () => {
    if (!businessName.trim()) {
      message.error("Business Name Required");
      return;
    }

    console.log(businessName);

    const payload = {
      name: businessName,
      country: "US",
      currency: "USD",
      fiscal_year_start: "2024-01-01",
      owner_user_id: user?.id,
    };
    const res = await axiosInstance.post(`/${userCompanies}`, payload);
    console.log(res);
    // setCompaniesData(res.data);
    setCompaniesData((prev) => [
      ...prev,
      {
        id: res.data.id,
        name: businessName,
        status: "trial",
      },
    ]);
    setShowModal(false);
    setBusinessName("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4">
      {/* Header */}
      <div className="w-full max-w-4xl text-center mt-16">
        <h1 className="text-4xl font-light text-gray-600">
          Welcome to{" "}
          <span className="font-semibold text-blue-500">ExtremeAccountant</span>
        </h1>

        <div className="border-b border-gray-200 my-8" />

        {/* Add Company */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition"
          >
            <span className="text-2xl leading-none">+</span>
            Add New Company
          </button>
        </div>
      </div>

      {/* Companies List */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl text-center font-medium text-gray-700 mb-6">
          Companies List
        </h2>

        <div className="divide-y">
          {companiesData.map((company) => (
            <button
                onClick={()=>{
                    dispatch(setCompany(company));
                    localStorage.setItem('company',JSON.stringify(company))
                    navigate('/dashboard')
                }}
              key={company.id}
              className="w-full flex items-center justify-between py-4 px-2 rounded-lg hover:bg-gray-50 transition"
            >
              <span className="text-lg font-medium text-blue-600">
                {company.name}
              </span>

              <span
                className={`px-3 py-1 text-sm rounded-full capitalize ${
                  statusStyles[company.status]
                }`}
              >
                {company?.status || "trial"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="mt-10">
        <button
          onClick={() => {
            dispatch(setUserLogout("logout"));
            navigate("/login");
          }}
          className="px-10 py-3 rounded-full bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-md"
        >
          Logout
        </button>
      </div>

      {/* Add Company Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Create New Company
            </h3>

            <label className="block text-sm font-medium text-gray-600 mb-2">
              Business Name
            </label>

            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter business name"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => createCompany()}
                className="px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Create Company
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
