import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";
import { fetchProductByIdAsync } from "../slice/productSlice";

const SingleProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById(productId)); 
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const match = useRouteMatch(); 

  useEffect(() => {
    dispatch(fetchProductByIdAsync(productId)); 
  }, [dispatch, productId, match]); 

  return (
    <div className="container mx-auto py-4">
      {loading ? (
        <p>Loading product details...</p>
      ) : error ? (
        <p>Error fetching product: {error}</p>
      ) : product ? (
        <div className="shadow-md rounded overflow-hidden p-4">
          <img
            src={product.cover.url} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p>{product.description}</p>
            {product.price && ( 
              <p className="font-bold text-gray-700">Price: ${product.price}</p>
            )}
          </div>
          
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default SingleProduct;
