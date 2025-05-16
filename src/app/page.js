'use client'
// import Image from "next/image";
import { useState, useEffect } from "react";
import FallbackImage from "@/components/FallbackImage";
import ProductModal from "@/components/ProductModal";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  async function getProduct(categoryId, currentLimit = 6){
    setLoading(true);
    try {
      let  url = `https://api.escuelajs.co/api/v1/products?limit=${currentLimit}&offset=0`;
      if (categoryId) {
        url = `https://api.escuelajs.co/api/v1/categories/${categoryId}/products?limit=${currentLimit}&offset=0`;
      } else {
        url = `https://api.escuelajs.co/api/v1/products?limit=${currentLimit}&offset=0`;
      }
      console.log({categoryId})
      console.log({url})
      const response = await fetch(url);
      const result = await response.json();
      setProducts(result);
      console.log('Success get products');
    } catch (error) {
      console.error("Error get products:", error);
    }
    setLoading(false);
  }

  async function getCategories() {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories');
      const result = await response.json();
      setCategories(result);
    } catch (error) {
      return error;
    }
  }

  function handleClick(product) {
    setSelectedProduct(product);
    setShowModal(true);
  }

  const fetchMore = () => {
    setLimit(prev => prev + 6);
  }

  useEffect(() => {
    getProduct(selectedCategory, limit);
  }, [selectedCategory, limit])
  
  useEffect(() => {
    getProduct(selectedCategory, limit);
    getCategories();
  }, [])

  return (
    <div >
      <div className="w-[850px] mb-10 -mt-10 -pt-5">
        <div className="text-xl font-bold text-black pb-2">Category</div>
        <div className="w-[850px] space-x-3 overflow-x-auto whitespace-nowrap" >
          <button
            className={`border rounded-lg w-[150px] px-3 py-2 ${
              selectedCategory === null
                ? 'bg-blue-500 text-white'
                : 'text-black hover:bg-blue-100'
            }`}
            onClick={() => {
              setSelectedCategory(null);
              setLimit(6);
            }}
          >
            All
          </button>
          {categories &&
            categories.map(category=>(
              <button
              key={category.id}
              className={`border rounded-lg w-[150px] px-3 py-2 ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'text-black hover:bg-blue-100'
              }`}
              onClick={() => {
                setSelectedCategory(category.id);
                setLimit(6);
              }}
            >
              {category.name}
            </button>
            ))    
          }
          
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-14 min-h-96">      
        { 
          products.length === 0 ? (
          <div className="min-h-96 col-span-3 text-center text-gray-500 flex items-center justify-center">
          Produk tidak ditemukan.
          </div>
          ) : 
          (products.map((o,i)=> (
            <button className="w-50 min-h-70 shadow-sm rounded-lg m-auto cursor-pointer" key={o.id} onClick={() => handleClick(o)}>
              <FallbackImage src={o.images[0]} width={200} height={120} alt='product'/>
              <div className="p-2 text-black">
                <div className="text-lg font-bold text-left ellipsis">{o.title}</div>
                <div className="text-red-500 text-md">{'$ '+ o.price}</div>
                <div className="text-xs text-slate-600">category: {o.category.name}</div>
              </div>
            </button>
          )))
        }
      </div>
      <div className="mt-8">
        <div className="flex justify-center mt-4">
          <button onClick={fetchMore} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      </div>
      <ProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={selectedProduct}
      />
    </div>
  );
}
