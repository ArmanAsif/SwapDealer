import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { createProduct, getProductList } from "../actions/productActions";

const RequestScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [usagePeriod, setUsagePeriod] = useState("");
  const [askingPrice, setAskingPrice] = useState("");
  const [transectionID, setTransectionID] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const uploadFileHandler = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "SwapDealer");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dectw0gjt/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const imageFile = await response.json();
    setImage(imageFile.secure_url);
    setLoading(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (userInfo && !loading) {
      dispatch(
        createProduct(
          name,
          image,
          brand,
          condition,
          usagePeriod,
          askingPrice,
          transectionID
        )
      );
      setName("");
      setImage("");
      setBrand("");
      setCondition("");
      setUsagePeriod("");
      setAskingPrice("");
      setTransectionID("");
      dispatch(getProductList());
      history.push("/profile");
    }
  };

  return (
    <div className="main">
      <SideBar />
      <div className="container post">
        <div className="form">
          <h3>Request Form</h3>
          <form className="formMain" onSubmit={submitHandler}>
            <label className="formLabelSize">Enter Product Name:</label>
            <input
              type="text"
              placeholder="Product Name"
              maxLength="16"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="formLabelSize">Select Image:</label>
            <input
              type="file"
              id="image-file"
              name="image"
              onChange={uploadFileHandler}
            />

            <label className="formLabelSize">Enter Brand:</label>
            <input
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />

            <label className="formLabelSize">Enter Condition:</label>
            <input
              type="text"
              placeholder="Enter Condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />

            <label className="formLabelSize">Enter Usage Period:</label>
            <input
              type="text"
              placeholder="Enter Usage Period"
              value={usagePeriod}
              onChange={(e) => setUsagePeriod(e.target.value)}
            />

            <label className="formLabelSize">Enter Asking Price:</label>
            <input
              type="text"
              placeholder="Enter Asking Price"
              value={askingPrice}
              onChange={(e) => setAskingPrice(e.target.value)}
            />

            <label className="formLabelSize">Enter bKash Transection ID:</label>
            <input
              type="text"
              placeholder="Enter bKash Transection ID"
              value={transectionID}
              onChange={(e) => setTransectionID(e.target.value)}
            />

            <button type="submit" className="submitButton">
              Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestScreen;
