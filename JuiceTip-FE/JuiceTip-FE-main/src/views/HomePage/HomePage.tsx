import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonLogo from "../../components/ButtonLogo/ButtonLogo";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../redux/store";
import TakeOrderModal from "../../components/Modal/TakeOrderModalBeforeLogin/TakeOrderModalBeforeLogin";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import Button from "../../components/Button/Button";
import { IRegion, getRegions } from "../../Services/regionService";
import { IProduct, getProducts } from "../../Services/productService";
import ChatButton from "../../components/ChatButton/ChatButton";
import { useNavigate } from "react-router-dom";
import RegionFilter from "../../components/RegionFilter/RegionFilter";

const Homepage = () => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const [isVisible, setIsVisible] = useState(false);
  const [regions, setRegions] = useState([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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
  }, []);

  const handleSearch = (query: string, index: number) => {
    if (clickedIndex === index) {
      setSearchQuery(prevQuery => prevQuery === query ? "" : query);
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

  const handleNavMyProduct = () => {
    if (!isLoggedIn) {
      setIsVisible(true);
    } else {
      nav("/my-products");
    }
  };

  const handleFilterButtonClick = () => {
    setShowRegions(!showRegions);
  };

  return (
    <div className="bg-e5e5e5">
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mt-28 mb-20 gap-2">
          <h1 className="text-5xl font-bold text-10b981">
            {isLoggedIn
              ? `WELCOME TO JUICETIP, ${user.firstName.toUpperCase()}`
              : "WELCOME TO JUICETIP"}
          </h1>
          <p className="text-10b981 text-2xl">Your Entrustment Solution!</p>
        </div>
        <div className="flex items-center justify-center">
          <ButtonLogo
            href="/juice-tip"
            src="juiceTip.png"
            title="JuiceTip"
            setIsVisible={setIsVisible}
          />
          <ButtonLogo
            href="/juice-mart"
            src="juiceMart.png"
            title="JuiceMart"
            setIsVisible={setIsVisible}
          />
          <ButtonLogo
            href="/juice-track"
            src="juiceTrack.png"
            title="JuiceTrack"
            setIsVisible={setIsVisible}
          />
        </div>
        <div className={showRegions ? "bg-fafafa px-5 pb-5 rounded-xl mt-24 w-2/3" : "w-2/3"}>
          <SearchBar
            onSearch={handleSearch}
            className={showRegions ? "border border-black mt-5" : ""}
          />
          <RegionFilter
            regions={regions}
            showRegions={showRegions}
            handleSearch={handleSearch}
            handleFilterButtonClick={handleFilterButtonClick}
            handleNavMyProduct={handleNavMyProduct}
            clickedIndex={clickedIndex}
          />
        </div>
        {filteredProducts.length > 0
          ? filteredProducts.map((product, index) => (
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
            ))
          : dataLoaded && (
              <p className="text-red-600 font-bold text-3xl mb-10">
                No products found
              </p>
            )}
        <ChatButton setIsVisible={setIsVisible} />
      </div>
      <Footer />
      {isVisible && (
        <TakeOrderModal isVisible={isVisible} setIsVisible={setIsVisible} />
      )}
    </div>
  );
};

export default Homepage;
