'use client'
import {useState, useEffect} from "react";


export default function Footer(){
  const [quotes, setQuotes] = useState({});

  async function getQuotes(){
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      const result = await response.json();
      setQuotes(result);
      return 'Success get quotes';
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    getQuotes().then(res=>console.log(res)).catch(err=>console.log(err));
  }, [])
  return (
    <footer className=" items-center justify-center px-32 py-3 m-auto sticky bottom-0 z-50 bg-black h-14">
    <div className="text-white text-center">
      <p className="font-bold text-md italic"> {quotes.quote} </p>
      <p className="text-white text-center">{quotes.author ? ('by : ' + quotes.author) : ''}</p>
    </div>
  </footer>
  )
}