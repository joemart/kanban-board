'use client'
import { Card, CardHeader, CardContent, CardTitle } from "@/ui/card";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/ui/context-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldTitle, FieldError } from "@/ui/field";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoardContext } from "@/app/context/BoardContext";
import { useContext } from "react";

const formSchema = z.object({
    name: z.string().min(3, "Must contain at least 3 characters")
    .max(15, "Must be below 15 characters")
})

const Column = ({children, name, removeColumn, columnId} : {children: React.ReactNode, name: string, removeColumn: ()=>void,  columnId : string}) => {

    const boardcontext = useContext(BoardContext)

    //handle title column change
    //handle add card

    //To Do, In Progress, Review, Done
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {name}
    })

    if(!boardcontext) return;
    const handleSubmit = ({name} : {name: string}) =>{
        boardcontext.editColumn(columnId, {name})
        
    }

    

    return ( <ContextMenu>
        <ContextMenuTrigger>

            <Card className=" flex flex-col h-full flex-[1_1_200px] max-w-55 min-w-40">
                <CardHeader >
                    <CardTitle>
                        {name}
                    </CardTitle>  
                </CardHeader>
                <CardContent className=" flex flex-col gap-3">
                    {children}
                </CardContent>
            </Card>
            
        </ContextMenuTrigger>
        <Dialog>
            <ContextMenuContent>       
                        <DialogTrigger asChild>
                            <ContextMenuItem>
                             Edit
                            </ContextMenuItem>   
                        </DialogTrigger>
                <ContextMenuItem onClick={removeColumn} className=" text-[red] bg-[#ff000012] data-[highlighted]:bg-[#ff00006d] data-[highlighted]:text-[#ffffffcd]">
                    Delete
                </ContextMenuItem>
            </ContextMenuContent> 
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Edit the column
                        </DialogTitle>
                    </DialogHeader>
                    <form className=" flex flex-col gap-3.5" method="POST" onSubmit={form.handleSubmit(handleSubmit)}>
                    <Controller name="name" control={form.control}
                    render={({field, fieldState})=>{
                        return <Field>
                            <FieldTitle>
                                Name
                            </FieldTitle>
                            <Input {...field} name="name" type="name" aria-invalid={fieldState.invalid}/>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]}/> }
                        </Field>
                    }}/>
                    <DialogClose asChild>
                        <Button type="submit" className=" cursor-pointer">Save</Button> 
                    </DialogClose>
                    
                    </form>
                </DialogContent>
            </Dialog>
    </ContextMenu> );
}
 
export default Column;