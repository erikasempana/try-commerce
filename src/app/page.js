'use client'
// import Image from "next/image";
import { useState, useEffect } from "react";
import FallbackImage from "@/components/FallbackImage";
import Pagination from "@/components/Pagination";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  function handlePageChange(page) {
    setCurrentPage(page);
  }
  async function getProduct(){
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const result = await response.json();
      setProducts(result);
      return 'Success get products';
    } catch (error) {
      return error;
    }
  }

  async function getCategories() {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories');
      const result = await response.json();
      setCategories(result);
      console.log({result})
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    getProduct().then(res=>console.log(res)).then(err=>console.log(err))
    getCategories().then(res=>console.log(res)).then(err=>console.log(err))
  }, [])
  return (
    <div >
      <div className="w-[850px] mb-10 -mt-10 -pt-5">
        <div className="text-xl font-bold text-black pb-2">Category</div>
        <div className="w-[850px] space-x-3 overflow-x-auto whitespace-nowrap" >
          {categories &&
            categories.map((category, index)=>(
            <button className="border-1 rounded-lg text-black hover:bg-blue-500 w-[150px]" key={category.id}>{category.name}</button>
            ))    
          }
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-14">      
        { currentProducts &&
        currentProducts.map((o,i)=> (
          <div className="w-50 h-70 shadow-sm rounded-lg m-auto curcursor-pointersor" key={o.id}>
            <FallbackImage src={o.images[0]} width={200} height={120} alt='product'/>
            <div className="p-2 text-black">
              <div className="text-lg font-bold text-left ellipsis">{o.title}</div>
              <div className="text-red-500 text-md">{'$ '+ o.price}</div>
              <div className="text-xs text-slate-600">category: {o.category.name}</div>
            </div>
          </div>
        ))
        }
      </div>
      {currentPage &&
      (
      <div className="mt-8">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      )}
    </div>
  );
}
