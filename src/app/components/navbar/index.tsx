"use client"
import { useAuthenticated , useSignOut } from "@nhost/nextjs";
import Link from "next/link";


const Navbar = () => {
    const isAuthenticated = useAuthenticated()
    const {signOut} = useSignOut()



    return ( <section>
       <Link href={"/"}>Home</Link>
        {isAuthenticated ? <button className=" cursor-pointer" onClick={signOut}>Sign out</button> : <div><Link href={"/signin"}>Sign In</Link></div>}
        <Link href={"/register"}>Register</Link>
    </section> );
}
 
export default Navbar;