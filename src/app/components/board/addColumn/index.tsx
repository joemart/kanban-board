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
const formSchema = z.object({
        name: z.string()
            .min(2, "Must contain at least 2 characters")
            .max(10, "Must be below 10 characters")
    })

const AddColumnButton = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {name: ""}
    })
    const boardcontext = useContext(BoardContext)
    if(!boardcontext)return

    const handleSubmit = ({name}:{name:string}) =>{
        boardcontext.addOneColumn(name)
    }



    return ( <Popover>
        <PopoverTrigger asChild>
            <Button>Add column button</Button>
        </PopoverTrigger>
        <PopoverContent>
            <form className=" flex flex-col gap-3.5" onSubmit={form.handleSubmit(handleSubmit)} method="POST">
                <Controller name="name" 
                control={form.control} 
                render={({field, fieldState})=>{
                    return <Field>
                        <FieldTitle>
                            Add new column
                        </FieldTitle>
                        <FieldLabel>
                            Name
                        </FieldLabel>
                        <Input {...field} type="name" name="name" aria-invalid={fieldState.invalid}/>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                }}/>
                <div className=" flex justify-between">
                    <Button variant={'secondary'} type="submit">Submit</Button>
                    <PopoverClose asChild><Button>Close</Button></PopoverClose>
                </div>
            </form>
            
        </PopoverContent>
    </Popover>
         );
}
 
export default AddColumnButton;