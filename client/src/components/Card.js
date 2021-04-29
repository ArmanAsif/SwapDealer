import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ product, checkAdmin }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className="card">
      <div className="cardTop">
        <img src={product.image} alt="" />
      </div>
      <div className="cardBottom">
        <p>
          <i className="fa fa-tag faGreenColor"></i>
          {product.askingPrice}
        </p>
        <p>
          <i className="fa fa-clock-o faGreenColor"></i>
          {product.usagePeriod}
        </p>
        <p>
          <i className="fa fa-dot-circle-o faGreenColor"></i>
          {product.name}
        </p>
        {checkAdmin ? (
          <Link
            to={`/admin/product/${product._id}`}
            className="cardButton redColor"
          >
            Review
          </Link>
        ) : (
          <Link to={`/product/${product._id}`} className="cardButton redColor">
            {userInfo._id === product.user._id
              ? product.isApprove
                ? "Approved"
                : product.isDiscard
                ? "Discarded"
                : "Not Approved"
              : "Details"}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
