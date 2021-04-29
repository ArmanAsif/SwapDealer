import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import Card from "../components/Card";
import Paginate from "../components/Paginate";
import { getProductList } from "../actions/productActions";


const ProfileScreen = ({ history }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 8;
  const pagesVisited = pageNumber * productPerPage;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, products } = productList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(getProductList());
    }
  }, [userInfo, history, dispatch]);

  const newProducts =
    products &&
    products.filter(
      (product) =>
        userInfo && product.user._id === userInfo._id && !product.isSold
    );

  const pageCount =
    newProducts && Math.ceil(newProducts.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="main">
      <SideBar />
      <div className="container">
        <h2>{userInfo && userInfo.name} Products</h2>
        {loading && <div className="loader">Loading...</div>}
        <div className="cardContainer">
          {newProducts &&
            newProducts
              .slice(pagesVisited, pagesVisited + productPerPage)
              .map((product) => {
                return <Card product={product} key={product._id} />;
              })}
        </div>
        <div className="paginate">
          <Paginate pageCount={pageCount} changePage={changePage} />
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
