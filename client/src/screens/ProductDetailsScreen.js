import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import { productDetailsById, markProductAsSold } from "../actions/productActions";

const ProductDetailsScreen = ({ history, match }) => {
  const productID = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product } = productDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(productDetailsById(match.params.id));
    }
  }, [match, userInfo, history, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(window.confirm(`${userInfo.name}, Are You Sure To Mark As Sold?`)){
      dispatch(markProductAsSold(match.params.id));
      history.push('/profile')
    }
  };

  return (
    <div className="main">
      <SideBar />
      <div className="container productDetails">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <>
            <div className="product">
              <div className="productTop">
                <img src={product && product.image} alt="" />
              </div>
              <div className="productBottom">
                <p>
                  <i className="fa fa-user faGreenColor"></i>
                  {product && product.user && product.user.name}
                </p>
                <p>
                  <i className="fa fa-dot-circle-o faGreenColor"></i>
                  {product && product.name}
                </p>
                <p>
                  <i className="fa fa-sort faGreenColor"></i>
                  {product && product.condition}
                </p>
                <h4>
                  <i className="fa fa-tag faGreenColor"></i>
                  {product && product.askingPrice}
                </h4>
                <p>
                  <i className="fa fa-bookmark faGreenColor"></i>
                  {product && product.brand}
                </p>
                <p>
                  <i className="fa fa-clock-o faGreenColor"></i>
                  {product && product.usagePeriod}
                </p>
                <p>
                  {product && product.isApprove ? (
                    <i className="fa fa-phone faGreenColor"></i>
                  ) : (
                    <i className="fa fa-times faNotReview"></i>
                  )}
                  {product && product.isApprove
                    ? product.user.bKash
                    : "Not Approved Yet"}
                </p>
                <button
                  type="submit"
                  className="submitButton greenColor"
                  disabled={
                    (product &&
                      userInfo &&
                      product.user &&
                      product.user._id !== userInfo._id) ||
                    (product && !product.isApprove)
                  }
                  onClick={(e) => submitHandler(e)}
                >
                  {product &&
                  userInfo &&
                  product.user &&
                  product.user._id === userInfo._id &&
                  product.isApprove
                    ? "Marked As Sold"
                    : "Remain Unsold"}
                </button>
              </div>
            </div>

            {userInfo && product && product.isApprove && (
              <div className="messenger">
                <Chat
                  userID={userInfo._id}
                  name={userInfo.name}
                  room={productID}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsScreen;
