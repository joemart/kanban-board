"use client"
import { useAuthenticated , useSignOut } from "@nhost/nextjs";
import { Menubar } from "@/ui/menubar";

import Link from "next/link";
import KanbanButton from "../KanbanButton";

const Navbar = () => {
    const isAuthenticated = useAuthenticated()
    const {signOut} = useSignOut()

    return ( <Menubar className="flex justify-between ">
       <KanbanButton variant={"outline"} size={"xs"} className=""><Link href={"/"}>Home</Link></KanbanButton>
        <div className="flex gap-3.5">
            {isAuthenticated ? <KanbanButton variant={"outline"} size={"xs"} className=" cursor-pointer" onClick={signOut}>Sign out</KanbanButton> : <KanbanButton variant={"outline"} size={"xs"}><Link href={"/signin"}>Sign In</Link></KanbanButton> }
            <KanbanButton variant={"outline"} size={"xs"}><Link href={"/register"}>Register</Link>  </KanbanButton>
        </div>
    </Menubar> );
}
 
export default Navbar;