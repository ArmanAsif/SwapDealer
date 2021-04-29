import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import {
  productDetailsById,
  approveProductByAdmin,
  getProductList,
} from "../actions/productActions";

const ProductCheckScreen = ({ history, match }) => {
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(productDetailsById(match.params.id));
    }
  }, [userInfo, history, dispatch, match]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!keyword) {
      if (
        window.confirm(`${userInfo.name}, Are You Sure To Discard The Post?`)
      ) {
        dispatch(approveProductByAdmin(match.params.id, keyword, false));
        dispatch(getProductList());
        history.push("/admin/check");
      }
    } else {
      dispatch(approveProductByAdmin(match.params.id, keyword, true));
      dispatch(getProductList());
      history.push("/admin/check");
    }
  };

  return (
    <div className="main">
      <SideBar />
      <div className="container post">
        <div className="form">
          <h3>{product && product.user && product.user.name} Post</h3>
          <form className="formMain" onSubmit={submitHandler}>
            <label className="formLabelSize">Product Name:</label>
            <input
              type="text"
              placeholder={product && product.name}
              disabled={true}
            />

            <label className="formLabelSize">Price:</label>
            <input
              type="text"
              placeholder={product && product.askingPrice}
              disabled={true}
            />

            <label className="formLabelSize">bKash Nmuber:</label>
            <input
              type="text"
              placeholder={product && product.user && product.user.bKash}
              disabled={true}
            />

            <label className="formLabelSize">Transection ID:</label>
            <input
              type="text"
              placeholder={product && product.transectionID}
              disabled={true}
            />

            <label className="formLabelSize">Set Keyword:</label>
            <input
              type="text"
              placeholder="Ex: Phone"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <button type="submit" className="submitButton greenColor">
              Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckScreen;

