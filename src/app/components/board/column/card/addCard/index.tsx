'use client'
import { Button } from "@/ui/button";
import { Popover, PopoverContent, PopoverTrigger,  } from "@/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Field, FieldError, FieldLabel, FieldTitle } from "@/ui/field";
import { useContext } from "react";
import { BoardContext } from "@/app/context/BoardContext";
import { Controller, useForm } from "react-hook-form";
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";

import { useUserId } from "@nhost/nextjs";

// const formSchema = z.object({
//         title: z.string()
//             .min(2, "Must contain at least 2 characters.")
//             .max(10, "Must be below 10 characters."),
//         description: z.string()
//             .min(5, "Must contain at least 5 characters.")
//             .max(200, "Must be below 200 characters.")
//     })

const AddCardButton = ({columnId, length}: {columnId:string, length:number}) => {
    
    const getUserId = useUserId()

    const formSchema = z.object({
        title: z.string().min(3, "Must contain at least 3 characters." )
        .max(10, "Must contain at most 10 characters."),
        description: z.string().min(3, "Must contain at least 3 characters.")
        .max(200, "Must contain at most 200 characters.")
    })

    const form = useForm(
        {
        resolver: zodResolver(formSchema),
        defaultValues: {title: "", description: ""},
        
    }
)
    const {register, formState: {errors}} = form

    const boardcontext = useContext(BoardContext)

    if(!boardcontext)return
    if(!getUserId)return

    const onSubmit = ({title, description}:{title:string, description: string}) =>{
        boardcontext.addOneCard(columnId, title, description, length , getUserId)
        // console.log(getUserId)
        // console.log("card submit")
    }

    return ( <Popover>
        <PopoverTrigger asChild>
            <Button>Add card</Button>
        </PopoverTrigger>
        <PopoverContent>
            <form className=" flex flex-col gap-3.5" onSubmit={form.handleSubmit(onSubmit)} method="POST">

                <Field>
                    <FieldTitle>
                        Add a new card
                    </FieldTitle>
                    <FieldLabel>
                        Title
                    </FieldLabel>
                    <Input type="text" {...register("title")}
                    aria-invalid={errors.title  ? "true" : "false"}
                    />
                    {errors.title && <FieldError errors={[errors.title]}></FieldError>}
                    
                    <FieldLabel>
                        Description
                    </FieldLabel>
                    <Textarea rows={4} {...register("description")}
                    aria-invalid={errors.description ? "true" : "false"}/>
                    {errors.description && <FieldError errors={[errors.description]}></FieldError>}
                </Field>

                <div className=" flex justify-between">
                    <Button variant={'secondary'} type="submit">Submit</Button>
                    <PopoverClose asChild><Button>Close</Button></PopoverClose>
                </div>
            </form>
            
        </PopoverContent>
    </Popover>
         );
}
 
export default AddCardButton;