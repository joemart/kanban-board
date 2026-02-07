'use client'
import { useContext } from "react"
import { BoardContext } from "@/app/context/BoardContext"
import {SidebarTrigger, Sidebar as SidebarMain, SidebarHeader, 
    SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuSub, 
    SidebarMenuSubItem, 
 } from "@/components/ui/sidebar"
import {Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {Button} from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent, PopoverClose  } from "@radix-ui/react-popover"
import {useForm, Controller} from "react-hook-form"
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useBoards } from "@/app/queries/boards.graphql"

const formSchema = z.object({
    name: z.string()
        .min(4, "Must contain at least 4 characters")
        .max(20, "Must be below 20 characters")
})



const Sidebar = () => {

    const {data, loading, error}  = useBoards()
    const boardContext = useContext(BoardContext)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "" }
    })

    const handleSubmit= (data: z.infer<typeof formSchema>) =>{
        //save to DB
    }


    if(!boardContext) return;
    if(loading) return
    if(error) return
    if(!data) return
    const {handleSelectBoard} = boardContext;
    

    return ( 
        <SidebarMain className=" h-full relative">
            <SidebarTrigger className=" absolute -right-9"/>
            
            <SidebarContent >
                
                <SidebarMenu className=" px-2" >

                    <Collapsible >
                        <CollapsibleTrigger className="group"> Projects <span className=" inline-block group-data-[state=open]:rotate-90">{">"}</span> </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub >
                                {loading ? "loading..." : 
                                // JSON.stringify(data.boards)
                                data.boards.map((board, index : number)=>
                                    <SidebarMenuSubItem className=" cursor-pointer" key={index} onClick={()=>handleSelectBoard(board.id)}>
                                        {board.name}
                                    </SidebarMenuSubItem>
                                    )
                                }
                                
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </Collapsible>
                    
                    <Popover >
                        <PopoverTrigger asChild>
                             <Button  variant={"outline"} className=" w-fit self-end">Add Project +</Button>
                        </PopoverTrigger>
                        <PopoverContent >
                          
                            <Card className=" w-3xs h-fit ">
                                <CardContent>
                                    <form className=" flex flex-col gap-2.5" method="POST" onSubmit={form.handleSubmit(handleSubmit)}>
                                    <FieldGroup>
                                        <Controller
                                        name="name"
                                        control={form.control}
                                        render={({fieldState, field})=>{
                                            return <Field >
                                            <FieldLabel>
                                                Name
                                            </FieldLabel>
                                            <Input {...field} type="text" name="name" aria-invalid={fieldState.invalid} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                        </Field>
                                        }}
                                        />

                                        
                                        
                                       
                                       </FieldGroup>
                                        <div className="flex justify-between">
                                            <Button variant={'outline'}>Save</Button>
                                            <PopoverClose asChild>
                                                <Button variant={'destructive'}>Cancel</Button>
                                            </PopoverClose>
                                        </div>
                                    </form> 
                                </CardContent>
                            </Card>
                           
                           
                            
                        </PopoverContent>
                    </Popover>
                    

                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                username logout
            </SidebarFooter>
        </SidebarMain>
      
    );
}
 
export default Sidebar;


// 787 561 0750 - Medicare