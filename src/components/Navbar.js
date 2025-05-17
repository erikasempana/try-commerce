'use client'
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="grid grid-cols-2 sticky top-0 w-[100%] px-32 z-50 bg-black">
      <h1 className="text-white font-extrabold text-4xl p-2 items-start justify-items-start">Try Commerce</h1>

      {/* <Link className="text-white my-auto text-right items-end justify-items-end"  href="/login">Login</Link> */}
      
    </nav>
  )
}