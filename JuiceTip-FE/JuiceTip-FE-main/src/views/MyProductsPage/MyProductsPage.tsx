import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BackButton from "../../components/BackButton/BackButton";
import ChatButton from "../../components/ChatButton/ChatButton";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  IProduct,
  IProgressProduct,
  getProducts,
  getProgressProducts,
} from "../../Services/productService";
import { useNavigate } from "react-router-dom";
import { IRegion, getRegions } from "../../Services/regionService";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import RegionFilter from "../../components/RegionFilter/RegionFilter";
import ProductCardProgess from "../../components/ProductCardProgress/ProductCardProgess";

const MyProductsPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [regions, setRegions] = useState([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [progressProducts, setProgressProducts] = useState<IProgressProduct[]>(
    []
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showRegions, setShowRegions] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const nav = useNavigate();

  useEffect(() => {
    getRegions((res: any) => {
      setRegions(res);
    });
    getProducts((res: any) => {
      setProducts(res);
      setDataLoaded(true);
    });
    getProgressProducts(user.userId, (status: boolean, res: any) => {
      if (status) {
        setProgressProducts(res);
      }
    });
  }, []);
  const handleClick = () => {
    nav("/add-product");
    nav(0);
  };
  const handleSearch = (query: string, index: number) => {
    if (clickedIndex === index) {
      setSearchQuery((prevQuery) => (prevQuery === query ? "" : query));
      setClickedIndex(-1);
    } else {
      setSearchQuery(query);
      setClickedIndex(index);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.regionName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFilterButtonClick = () => {
    setShowRegions(!showRegions);
  };

  return (
    <div>
      <Navbar />
      <BackButton />
      <div className="relative bg-e5e5e5 min-h-screen py-14 flex flex-col items-center">
        <div className="flex items-center justify-evenly w-2/3 max-sm:flex-col max-sm:gap-10">
          <div className="flex items-center justify-center gap-5">
            <img
              src={require("../../assets/images/juiceTip.png")}
              alt="juiceTip"
              className="max-lg:w-36 max-lg:h-36"
            />
            <h1 className="text-10b981 font-bold text-5xl max-lg:text-4xl">
              JuiceTip
            </h1>
          </div>
          <Button
            className="bg-10b981 text-white text-lg p-3 flex items-center justify-center gap-3 px-9"
            onClick={handleClick}
          >
            <img
              src={require("../../assets/images/add_circle.png")}
              alt="addCircle"
              className="w-8"
            />
            <p>Add New Product</p>
          </Button>
        </div>
        <div
          className={
            showRegions ? "bg-fafafa px-5 pb-5 rounded-xl mt-24 w-2/3" : "w-2/3"
          }
        >
          <SearchBar
            onSearch={handleSearch}
            className={showRegions ? "border border-black mt-5" : ""}
          />
          <RegionFilter
            regions={regions}
            showRegions={showRegions}
            handleSearch={handleSearch}
            handleFilterButtonClick={handleFilterButtonClick}
            clickedIndex={clickedIndex}
          />
        </div>
        {progressProducts &&
          progressProducts.map((product, index) => (
            <ProductCardProgess
              key={product.productId}
              productId={product.productId}
              productName={product.productName}
              productPrice={product.productPrice}
              productImage={product.productImage}
              productImageList={product.productImageList}
              productDescription={product.productDescription}
              categoryId={product.categoryId}
              categoryName={product.categoryName}
              regionId={product.regionId}
              regionName={product.regionName}
              notes={product.notes}
              createdAt={product.createdAt}
              lastUpdatedAt={product.lastUpdatedAt}
              justiperName={product.justiperName}
              status={product.status}
              justiperId={product.justiperId}
            />
          ))}
        {filteredProducts.length > 0
          ? filteredProducts.map(
              (product, index) =>
                product.customerId === user?.userId && (
                  <ProductCard
                    key={product.productId}
                    productId={product.productId}
                    productName={product.productName}
                    productPrice={product.productPrice}
                    productImage={product.productImage}
                    productImageList={product.productImageList}
                    productDescription={product.productDescription}
                    categoryId={product.categoryId}
                    categoryName={product.categoryName}
                    regionId={product.regionId}
                    regionName={product.regionName}
                    customerId={product.customerId}
                    customerName={product.customerName}
                    notes={product.notes}
                    createdAt={product.createdAt}
                    lastUpdatedAt={product.lastUpdatedAt}
                  />
                )
            )
          : dataLoaded && (
              <p className="text-red-600 font-bold text-3xl mb-10">
                No products found
              </p>
            )}
        <ChatButton setIsVisible={() => {}} />
      </div>
      <Footer />
    </div>
  );
};

export default MyProductsPage;
