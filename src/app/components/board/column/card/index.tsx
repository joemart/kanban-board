'use client'
import {Card as CardMain, CardHeader, CardContent, CardTitle, CardFooter} from "@/ui/card"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/ui/context-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/ui/dialog";
import { Field, FieldTitle, FieldError } from "@/ui/field";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { useContext } from "react";
import { BoardContext } from "@/app/context/BoardContext";

const Card = ({children , id, position}:{children:React.ReactElement, id:string, position:number}) => {
const boardcontext = useContext(BoardContext)
if(!boardcontext)return

const deleteCard = () =>{
    // console.log(id)
    boardcontext.removeOneCard(id, position)
}

return ( <CardMain >
        <CardHeader>
            
            {/* Card name */}
        </CardHeader>
        <CardContent>
            {children}
            
           
        </CardContent>
        <CardFooter>
            <Button className=" cursor-pointer" onClick={()=>deleteCard()}>Delete</Button>
        </CardFooter>
         
    </CardMain> );
}
 
export default Card;