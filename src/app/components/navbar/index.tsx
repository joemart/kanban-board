"use client"
import { useAuthenticated , useSignOut } from "@nhost/nextjs";
import { Menubar } from "@/ui/menubar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import KanbanButton from "../KanbanButton";

const Navbar = () => {
    const isAuthenticated = useAuthenticated()
    const {signOut} = useSignOut()
    const router = useRouter()
    const handleSignOut : React.MouseEventHandler<HTMLButtonElement> = () =>{
        signOut()
        router.push("/signin")
    }

    return ( <Menubar className="flex justify-between bg-prime border-prime">
       <KanbanButton variant={"outline"} size={"xs"}><Link href={"/"}>Home</Link></KanbanButton>
        <div className="flex gap-3.5">
            {isAuthenticated ? <KanbanButton variant={"outline"} size={"xs"} className=" cursor-pointer" onClick={handleSignOut}>Sign out</KanbanButton> : <KanbanButton variant={"outline"} size={"xs"}><Link href={"/signin"}>Sign In</Link></KanbanButton> }
            <KanbanButton variant={"outline"} size={"xs"}><Link href={"/register"}>Register</Link>  </KanbanButton>
        </div>
    </Menubar> );
}
 
export default Navbar;