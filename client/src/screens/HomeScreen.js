import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../components/SideBar";
import Card from "../components/Card";
import Paginate from "../components/Paginate";
import { getProductList } from "../actions/productActions";

const HomeScreen = ({ history }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 8;
  const pagesVisited = pageNumber * productPerPage;

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  const myProducts =
    products &&
    products.filter(
      (product) =>
        userInfo &&
        product.isApprove &&
        !product.isSold &&
        !product.isDiscard &&
        product.user._id !== userInfo._id
    );

  var firstIndex = 0;
  var lastIndex = myProducts && myProducts.length;
  var newProducts = new Array(lastIndex);

  for (var i = 0; myProducts && i < myProducts.length; i++) {
    if (myProducts[i].user.city === userInfo.city) {
      newProducts[firstIndex] = myProducts[i];
      firstIndex = firstIndex + 1;
    } else {
      lastIndex = lastIndex - 1;
      newProducts[lastIndex] = myProducts[i];
    }
  }
  
  useEffect(() => {
    setFilteredProducts(
      newProducts.filter((product) =>
        product.keyword.toLowerCase().includes(search.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [search, setFilteredProducts]);

  const pageCount =
    newProducts && Math.ceil(newProducts.length / productPerPage);

  const pageCountForSearch =
    filteredProducts && Math.ceil(filteredProducts.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="main">
      <SideBar />
      <div className="container">
        <div className="searchBox">
          <h2>Choose Your Product</h2>
          <input
            type="text"
            placeholder="Search Products..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {loading && <div className="loader">Loading...</div>}

        <div className="cardContainer">
          {search
            ? filteredProducts &&
              filteredProducts
                .slice(pagesVisited, pagesVisited + productPerPage)
                .map((product) => {
                  return <Card product={product} key={product._id} />;
                })
            : newProducts &&
              newProducts
                .slice(pagesVisited, pagesVisited + productPerPage)
                .map((product) => {
                  return <Card product={product} key={product._id} />;
                })}
        </div>
        <div className="paginate">
          <Paginate
            pageCount={search ? pageCountForSearch : pageCount}
            changePage={changePage}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
