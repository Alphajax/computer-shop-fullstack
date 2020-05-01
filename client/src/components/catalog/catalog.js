import React, {useEffect, useState} from "react";
import './catalog.css'
import NavBar from "../nav-bar/nav-bar";
import Spinner from "../spinner/spinner";
import ProductList from "../product-list/product-list";
import News from "../news/news";
import createProductService from "../../creators/product-service-creator";

const Catalog = ({isAuthorised}) => {
  const [productType, setProductType ] = useState ('empty');
  const [loading, setLoading ] = useState(true);
  const [products, setProducts] = useState(undefined);
  let [prod, prodService] = createProductService(productType);

  useEffect(() => {
      setLoading(true);
      [ prod, prodService] = createProductService(productType);
      fetchProducts();

  }, [productType] );


  const fetchProducts = () => {
      if (prodService){
          prodService.getAll()
              .then((prod) => {
                  onProductsLoaded(prod)
              })
      }
  };

  const onProductsLoaded = (p) => {
      setProducts(p);
      setLoading(false);
  };
  let content;
  if (loading && productType !== 'empty'){
      content = <Spinner/>
  } else if (loading && productType === 'empty') {
      content = <News/>;
  } else {
      content = <ul><ProductList products= {products} Product = {prod} isAuthorised={isAuthorised}/></ul>
  }
  return (
      <React.Fragment>
        <NavBar onNavElementClick = {setProductType}/>
          {content}
      </React.Fragment>
  );
};

export default Catalog;
