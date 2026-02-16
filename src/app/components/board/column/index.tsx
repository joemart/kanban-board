'use client'
import { Card as CardMain, CardHeader, CardContent, CardTitle, CardFooter } from "@/ui/card";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/ui/context-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/ui/dialog";
import { Field, FieldTitle, FieldError } from "@/ui/field";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoardContext } from "@/app/context/BoardContext";
import { useContext } from "react";
import AddCardButton from "./card/addCard";
import { CardType } from "@/app/types/main.types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import Card from "@/components/board/column/card"

const formSchema = z.object({
    name: z.string().min(3, "Must contain at least 3 characters.")
    .max(15, "Must be below 15 characters.")
})

const Column = ({name, removeColumn, columnId, cards} : {name: string, removeColumn: ()=>void,  columnId : string, cards: CardType[]}) => {


    const boardcontext = useContext(BoardContext)

    //To Do, In Progress, Review, Done
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {name}
    })

    if(!boardcontext) return;
    if(!boardcontext.columns) return;
    const handleSubmit = ({name} : {name: string}) =>{
        boardcontext.editColumn(columnId, {name})
    }


    return ( <ContextMenu>
        <ContextMenuTrigger>

            <CardMain className=" flex flex-col h-full flex-[1_1_200px] max-w-55 min-w-40 ">
                <CardHeader >
                    <CardTitle>
                        {name}
                    </CardTitle>  
                    
                </CardHeader>
                <CardContent className=" flex flex-col gap-3">
                        <Droppable droppableId={columnId} direction="vertical" type="CARD">
                            {(provided)=>{
                            return <div ref={provided.innerRef} {...provided.droppableProps}>
                                {cards.map((card, index) =>{
                                    return <Draggable index={index} key={card.id} draggableId={card.id}>
                                        {(provided)=>{
                                            return <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                        <Card id={card.id} position={index} >
                                                            <>
                                                                <h2 className=" font-bold">{card.title}</h2>
                                                                <span >
                                                                    {card.description}
                                                                </span>
                                                            </>
                                                        </Card>
                                                    </div>
                                        }}
                                        </Draggable>
                                })}
                                {provided.placeholder}
                                </div>
                            }}
                            
                        </Droppable>
                    </CardContent>
                
                <CardFooter >
                   <AddCardButton columnId={columnId} length={cards.length}/> 
                </CardFooter>
                
            </CardMain>
            
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
                <DialogContent aria-describedby={undefined}>
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