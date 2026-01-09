import { Button, Card, Col, DatePicker, Flex, message, Modal, Row } from "antd";

import { InputBox, SelectBox, TextAreaBox } from "@components/formfields";
import { useForm } from "react-hook-form";

import { axiosInstance } from "@apiClient";


import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";

import { addNonStockProduct } from "@validations/articles/articles";
import Upload from "antd/es/upload/Upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const AddStockProduct = () => {
  const [editData, setEditData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(addNonStockProduct),
  });

  const onSubmit = async (data: any) => {
    console.log(data);

    // const formData = new FormData();

    // data.tags = JSON.stringify(data.tags);
    // for (const key in data) {
    //   let val = data[key];
    //   formData.append(key, val);
    // }

    // const url = editData?.id ? `${updateArticles}/${editData.id}` : addArticles;
    // try {
    //   const res: any = editData?.id
    //     ? await axiosInstance.patch(url, formData)
    //     : await axiosInstance.post(url, formData);
    //   if (res?.code === 200) {
    //     console.log(res);
    //     message.open({
    //       type: "success",
    //       content: editData?.id
    //         ? "Article Edit Successfully"
    //         : "Article Added Successfully",
    //     });
    //   } else {
    //     message.open({
    //       type: "error",
    //       content: "Something went wrong",
    //     });
    //   }
    // } catch (error: any) {
    //   console.log("error", error);
    //   message.error(error?.response?.data?.message);
    // }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <div>
      <h1 className="text-3xl tracking-wider mb-6">Add Stock Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[20, 20]} className="my-4">
          <Col span={8}>
            <InputBox
              name="bank"
              control={control}
              label={"Name"}
              placeholder="Start Typing..."
              error={errors?.bank?.message}
            />
          </Col>

          <Col span={8}>
            <Row gutter={12}>
              <Col span={12}>
                <div className="mb-3">
                  <label className="text-[14px] block font-normal">Date</label>

                  <DatePicker
                    onChange={(e) => {
                      //   setFilter({
                      //     ...filter,
                      //     startDate: e ? dayjs(e).format("YYYY-MM-DD") : "",
                      //   });
                    }}
                    className="w-full h-10 rounded-sm"
                  />
                </div>
              </Col>
              <Col span={12}>
                <InputBox
                  name="bank"
                  control={control}
                  label={"Opening Quantity"}
                  placeholder="Start Typing..."
                  error={errors?.bank?.message}
                />
              </Col>
            </Row>
          </Col>

          <Col span={8}>
            <InputBox
              name="code"
              control={control}
              label={"Opening Rate"}
              placeholder="Start Typing..."
              error={errors?.code?.message}
            />
          </Col>
        </Row>

        <Row className="mt-4" gutter={[20, 20]}>
          <Col span={8}>
            <InputBox
              name="code"
              control={control}
              label={"Code / Number"}
              placeholder="Start Typing..."
              error={errors?.code?.message}
            />
          </Col>
          <Col span={8}>
            <div className="mb-3">
              <label className="text-[14px] block font-normal">
                Stock Asset Account
              </label>
              <SelectBox
                name="code"
                control={control}
                placeholder="Select Customer"
                style={{ width: "100%", height: 40, borderRadius: 6 }}
                options={[]}
                showSearch

                // onChange={(e) => setFilter({ ...filter, status: e })}
              />
            </div>
          </Col>
          <Col span={8}>
            <InputBox
              name="code"
              control={control}
              label={"Low Stock Level"}
              placeholder="Start Typing..."
              error={errors?.code?.message}
            />
          </Col>
        </Row>

        <Row className="mt-4" gutter={[20, 20]}>
          <Col span={8}>
            <div className="mb-3">
              <label className="text-[14px] block font-normal">Category</label>
              <SelectBox
                name="code"
                control={control}
                placeholder="Select Category"
                style={{ width: "100%", height: 40, borderRadius: 6 }}
                options={[]}
                showSearch

                // onChange={(e) => setFilter({ ...filter, status: e })}
              />
            </div>
          </Col>
          <Col span={8}>
            <div className="mb-3">
              <label className="text-[14px] block font-normal">
                Income Account
              </label>
              <SelectBox
                name="code"
                control={control}
                placeholder="Select Income Account"
                style={{ width: "100%", height: 40, borderRadius: 6 }}
                options={[]}
                showSearch

                // onChange={(e) => setFilter({ ...filter, status: e })}
              />
            </div>
          </Col>
          <Col span={8}>
            <InputBox
              name="code"
              control={control}
              label={"Sale Price / Rate"}
              placeholder="Start Typing..."
              error={errors?.code?.message}
            />
          </Col>
        </Row>

        <Row className="mt-4" gutter={[20, 20]}>
          <Col span={8}>
            <TextAreaBox
              rows={4}
              control={control}
              name="description"
              placeholder="Start Typing..."
              label={"Sale Information"}
              error={errors?.description?.message}
            />
          </Col>
          <Col span={8}>
            <div className="mb-0">
              <label className="text-[14px] block font-normal">
                Expense Account
              </label>
              <SelectBox
                name="code"
                control={control}
                placeholder="Select Expense Account"
                style={{ width: "100%", height: 40, borderRadius: 6 }}
                options={[]}
                showSearch

                // onChange={(e) => setFilter({ ...filter, status: e })}
              />
            </div>

            <Row gutter={12}>
              <Col span={12}>
                <InputBox
                  name="bank"
                  control={control}
                  label={"Sale Discount (%)"}
                  placeholder="Start Typing..."
                  error={errors?.bank?.message}
                />
              </Col>
              <Col span={12}>
                <InputBox
                  name="bank"
                  control={control}
                  label={"Purchase Discount (%)"}
                  placeholder="Start Typing..."
                  error={errors?.bank?.message}
                />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <InputBox
              name="code"
              control={control}
              label={"Cost"}
              placeholder="Start Typing..."
              error={errors?.code?.message}
            />
            <Row gutter={12}>
              <Col span={12}>
                <InputBox
                  name="bank"
                  control={control}
                  label={"Weight"}
                  placeholder="Start Typing..."
                  error={errors?.bank?.message}
                />
              </Col>
              <Col span={12}>
                <div className="mb-0">
                  <label className="text-[14px] block font-normal">Unit</label>
                  <SelectBox
                    name="code"
                    control={control}
                    placeholder="Select Expense Account"
                    style={{ width: "100%", height: 40, borderRadius: 6 }}
                    options={[]}
                    showSearch

                    // onChange={(e) => setFilter({ ...filter, status: e })}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-4" gutter={[20, 20]}>
          <Col span={8}>
            <TextAreaBox
              rows={4}
              control={control}
              name="description"
              placeholder="Start Typing..."
              label={"Notes"}
              error={errors?.description?.message}
            />
          </Col>
          <Col span={8}>
            <Row gutter={12}>
              <Col span={12}>
                <InputBox
                  name="bank"
                  control={control}
                  label={"GST Rate"}
                  placeholder="Start Typing..."
                  error={errors?.bank?.message}
                />
              </Col>
              <Col span={12}>
                <InputBox
                  name="bank"
                  control={control}
                  label={"Non-Filer GST Rate"}
                  placeholder="Start Typing..."
                  error={errors?.bank?.message}
                />
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <InputBox
                  name="bank"
                  control={control}
                  label={"Bin Location"}
                  placeholder="Start Typing..."
                  error={errors?.bank?.message}
                />
              </Col>
              <Col span={12}>
                <InputBox
                  name="bank"
                  control={control}
                  label={"Large Pack Size"}
                  placeholder="Start Typing..."
                  error={errors?.bank?.message}
                />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row gutter={12}>
              <Col span={12}>
                <InputBox
                  name="bank"
                  control={control}
                  label={"MRP Ex. Tax"}
                  placeholder="Start Typing..."
                  error={errors?.bank?.message}
                />
              </Col>
              <Col span={12}>
                <InputBox
                  name="bank"
                  control={control}
                  label={"MRP Inc. Tax"}
                  placeholder="Start Typing..."
                  error={errors?.bank?.message}
                />
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <InputBox
                  name="bank"
                  control={control}
                  label={"Small Pack Size"}
                  placeholder="Start Typing..."
                  error={errors?.bank?.message}
                />
              </Col>
              <Col span={12}>
                <InputBox
                  name="bank"
                  control={control}
                  label={"Preferred Supplier"}
                  placeholder="Start Typing..."
                  error={errors?.bank?.message}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Card>
          <h1 className="font-bold text-xl">FBR Options</h1>
          <Row className="mt-4" gutter={[20, 20]}>
            <Col span={4}>
              <InputBox
                name="bank"
                control={control}
                label={"HS Code "}
                placeholder="Start Typing..."
                error={errors?.bank?.message}
              />
            </Col>
            <Col span={4}>
              <div className="mb-3">
                <label className="text-[14px] block font-normal">
                  FBR Sale Type
                </label>
                <SelectBox
                  name="code"
                  control={control}
                  placeholder="FBR Sale Type"
                  style={{ width: "100%", height: 40, borderRadius: 6 }}
                  options={[]}
                  showSearch

                  // onChange={(e) => setFilter({ ...filter, status: e })}
                />
              </div>
            </Col>
            <Col span={4}>
              <div className="mb-3">
                <label className="text-[14px] block font-normal">
                  FBR Sale Rate
                </label>
                <SelectBox
                  name="code"
                  control={control}
                  placeholder="FBR Sale Type"
                  style={{ width: "100%", height: 40, borderRadius: 6 }}
                  options={[]}
                  showSearch

                  // onChange={(e) => setFilter({ ...filter, status: e })}
                />
              </div>
            </Col>
            <Col span={4}>
              <div className="mb-3">
                <label className="text-[14px] block font-normal">
                  SRO Schedule No
                </label>
                <SelectBox
                  name="code"
                  control={control}
                  placeholder="FBR Sale Type"
                  style={{ width: "100%", height: 40, borderRadius: 6 }}
                  options={[]}
                  showSearch

                  // onChange={(e) => setFilter({ ...filter, status: e })}
                />
              </div>
            </Col>
            <Col span={4}>
              <div className="mb-3">
                <label className="text-[14px] block font-normal">
                  SRO Item Serial No
                </label>
                <SelectBox
                  name="code"
                  control={control}
                  placeholder="FBR Sale Type"
                  style={{ width: "100%", height: 40, borderRadius: 6 }}
                  options={[]}
                  showSearch

                  // onChange={(e) => setFilter({ ...filter, status: e })}
                />
              </div>
            </Col>
            <Col span={4}>
              <div className="mb-3">
                <label className="text-[14px] block font-normal">UOM</label>
                <SelectBox
                  name="code"
                  control={control}
                  placeholder="FBR Sale Type"
                  style={{ width: "100%", height: 40, borderRadius: 6 }}
                  options={[]}
                  showSearch

                  // onChange={(e) => setFilter({ ...filter, status: e })}
                />
              </div>
            </Col>
          </Row>
        </Card>
        <Row className="mt-4" gutter={[20, 20]}>
          <Col>
            <h1 className="font-bold text-xl">Upload Images</h1>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              // beforeUpload={beforeUpload}
              // onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  draggable={false}
                  src={imageUrl}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
        {/* <Button htmlType="submit">Submit</Button> */}
        <Flex align="end" justify="end" className="mt-10">
          <Button
            className="text-[#23AED5] font-bold border-2 border-[#23AED5] h-[38px]  w-[120px] rounded mr-4"
            // onClick={() => handleCancel()}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            className="text-[#fff] bg-[#23AED5] w-[120px] h-[38px] font-bold border-2 border-[#23AED5] rounded"
            // onClick={() => handleOk()}
          >
            Save
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default AddStockProduct;
