'use client'
import {Card as CardMain, CardHeader, CardContent, CardTitle, CardFooter} from "@/ui/card"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/ui/context-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/ui/dialog";
import { Field, FieldTitle, FieldError } from "@/ui/field";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import {useForm } from "react-hook-form"
import { useContext } from "react";
import { BoardContext } from "@/app/context/BoardContext";
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import {useUserId} from "@nhost/nextjs"

const Card = ({children , id, position}:{children:React.ReactElement, id:string, position: number}) => {

    const userId = useUserId()
    const formSchema = z.object({
        title: z.string().min(3, "Must contain at least 3 characters.").max(15, "Must be below 15 characters."),
        description: z.string().min(3, "Must contain at least 3 characters.").max(200, "Must be below 200 characters.")
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {title:"", description:""}
    })
    const {register, formState: {errors}} = form

    const boardcontext = useContext(BoardContext)
    if(!boardcontext || !userId)return
   

    const deleteCard = () =>{
        // console.log(id)
        boardcontext.removeOneCard(id)
    }
    
    
    const onSubmit = ({title, description}: {title:string, description:string}) =>{
        console.log("Card submit")
        boardcontext.editOneCard(id, title, description, position, userId)
    }

    return ( <ContextMenu>
        <ContextMenuTrigger>
          <CardMain >
            <CardHeader>
                
                {/* Card name */}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            
        </CardMain> 
        </ContextMenuTrigger>
        <Dialog>
            <ContextMenuContent>
                <DialogTrigger asChild>
                    <ContextMenuItem>
                        Edit
                    </ContextMenuItem>
                </DialogTrigger>
                <ContextMenuItem onClick={()=>deleteCard()} className=" text-[red] bg-[#ff000012] data-[highlighted]:bg-[#ff00006d] data-[highlighted]:text-[#ffffffcd]">
                    Delete card
                </ContextMenuItem>
            </ContextMenuContent>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>
                        Edit the card
                    </DialogTitle>
                    <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
                        <Field>
                            <FieldTitle>
                                Title
                            </FieldTitle>
                            <Input type="text" {...register("title")} aria-invalid = {errors.title ? true : false}/>
                            {errors.title && <FieldError errors={[errors.title]}></FieldError>}
                            
                            <FieldTitle>
                                Description
                            </FieldTitle>
                            <Input type="text" {...register("description")} aria-invalid={errors.description ? true : false}/>
                            {errors.description && <FieldError errors={[errors.description]}></FieldError>}
                            
                            <Button type="submit">Submit</Button>
                        </Field>
                    </form>
                </DialogHeader>
                
            </DialogContent>
        </Dialog>
</ContextMenu>    
);
}
 
export default Card;