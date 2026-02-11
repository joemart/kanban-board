'use client'
import { useContext, useEffect, useState } from "react"
import { BoardContext } from "@/app/context/BoardContext"
import {SidebarTrigger, Sidebar as SidebarMain, SidebarMenuBadge, SidebarMenuAction,
    SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuSub, 
    SidebarMenuSubItem, 
 } from "@/components/ui/sidebar"
import {Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import {Button} from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent, PopoverClose} from "@radix-ui/react-popover"
import {Dialog, DialogClose, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogFooter} from "@/ui/dialog"
import {useForm, Controller} from "react-hook-form"
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useAddBoard, useEditBoard,useDeleteBoard } from "@/app/mutations/boards.graphql"
import {useUserId} from "@nhost/nextjs"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useBoards} from "@/app/queries/boards.graphql"
import { BoardType } from "@/app/types/main.types"

import {Trash2, Pencil, ChevronRight} from "lucide-react"

const formSchema = z.object({
    name: z.string()
        .min(4, "Must contain at least 4 characters")
        .max(20, "Must be below 20 characters")
})



const Sidebar = () => {

    const [boards, setBoards] = useState<BoardType[] >()
    const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
    const {data, loading, error, refetch}  = useBoards()
    const boardContext = useContext(BoardContext)
    const {addBoard} = useAddBoard()
    const userId = useUserId()
    const {deleteBoard} = useDeleteBoard()
    const {editBoard} = useEditBoard()


    //board: remove board
    const deleteOneBoard = async(boardId:string)=>{
        try{
            if(!boards) return

            const tempBoards = [...boards]
            const oneLessBoard = tempBoards.filter(board=> board.id!= boardId)
            const optimisticBoards = oneLessBoard.map((board,index)=> ({...board, position:index}))
            console.log(optimisticBoards)
            setBoards(optimisticBoards)
            deleteBoard({
                variables: {boardId}
            })
        }catch(e)
        {
            console.log(e)
        }
       

    }

    //board: edit board
    const editOneBoard = async(boardId:string, name:string)=>{
        try{
            if(!boards) return
            const optimisticBoards = [...boards]
            const index = optimisticBoards.findIndex(board=> board.id == boardId)
            const [foundBoard] = optimisticBoards.splice(index, 1)
            const updatedBoard = {...foundBoard, name}
            optimisticBoards.splice(index, 0, updatedBoard)
            setBoards(optimisticBoards)
            editBoard({variables: {
                            set: {name},
                            id: boardId}})

        }
        catch(e){
            console.log(e)
        }
        
    }

    useEffect(()=>{
        if(!data)return
        setBoards(data.boards)
    },[data])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "" }
    })

    const editForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "" }
    })
    const {register, formState:{errors}} = editForm

    const handleSubmit= async (d: z.infer<typeof formSchema>) =>{
        //save to DB
        if(!boards) return
        
        try{
            setIsAddProjectOpen(false)
            if(!data) return
            await addBoard({
                variables: {object: {
                    name: d.name,
                    owner : userId,
                    position : boards.length
                }}
            })

        }catch(e){
            console.log(e)
        }
        refetch()
        
    }
    const handleDeleteSubmit = async(id:string)=>{
        try{
           deleteOneBoard(id) 
        }catch(e){
            console.log(e)
        }
        
    }

    const handleEditSubmit = async(boardId: string, name:string)=>{
        try{
            
            editOneBoard(boardId, name)
        }
        catch(e){
            console.log(e)
        }
        
    }

    if(!boardContext) return;
    if(loading) return
    if(error) return
    if(!boards) return
    const {handleSelectBoard} = boardContext;
    

    return ( 
        <SidebarMain className=" h-full relative">
            <SidebarTrigger className=" absolute -right-9"/>
            
            <SidebarContent >
                
                <SidebarMenu className=" px-2" >

                    <Collapsible >
                        <CollapsibleTrigger className="group flex justify-center"> Projects <span className=" inline-block group-data-[state=open]:rotate-90"><ChevronRight/></span> </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                
                                    {boards.map((board, index : number)=><div key={index}>
                                        <SidebarMenuSubItem className=" flex items-center justify-between " key={index} >
                                            <Button className="cursor-pointer" onClick={()=>handleSelectBoard(board.id)}>{board.name}</Button>
                                            <Dialog>
                                                <DialogTrigger>
                                                    <SidebarMenuBadge className="w-6 relative cursor-pointer"><Trash2/></SidebarMenuBadge>
                                                    </DialogTrigger>
                                                    <DialogContent className=" flex flex-col items-center">
                                                    <DialogTitle>Are you sure you want to delete {board.name}?</DialogTitle>
                                                    <DialogFooter className="flex justify-center" >
                                                        <DialogDescription className="flex justify-between w-[250px] max-w-[150px]">
                                                            <Button asChild onClick={()=>handleDeleteSubmit(board.id)} ><DialogClose>Yes</DialogClose></Button>
                                                            <Button asChild><DialogClose>No</DialogClose></Button>
                                                        </DialogDescription>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            <Dialog>
                                                    <DialogTrigger>
                                                        <SidebarMenuBadge className="w-6 relative cursor-pointer"><Pencil/></SidebarMenuBadge>
                                                    </DialogTrigger>
                                                    <DialogContent className=" flex flex-col items-center" aria-describedby={undefined}>
                                                    <DialogTitle>Edit board</DialogTitle>
                                                    <DialogFooter className="flex justify-center" >
                                                            <form method="POST" onSubmit={editForm.handleSubmit(formData => handleEditSubmit(board.id, formData.name))}>
                                                                <Input type="text" defaultValue={board.name} {...register("name")} aria-disabled={errors.name ? true : false}/>
                                                                {errors.name && <FieldError errors={[errors.name]}></FieldError>}
                                                                <Button asChild type="submit"><DialogClose>Submit</DialogClose></Button>
                                                            </form>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            
                                        </SidebarMenuSubItem>

                                            
                                        
                                        </div>
                                    )}
                                    
                               
                            </SidebarMenuSub>
                            <Popover open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
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
                                            
                                            <Button type="submit" variant={'outline'} >Save</Button>
                                            
                                            
                                            <PopoverClose asChild>
                                                <Button variant={'destructive'}>Cancel</Button>
                                            </PopoverClose>
                                        </div>
                                    </form> 
                                </CardContent>
                            </Card>
                           
                           
                            
                        </PopoverContent>
                            </Popover>
                        </CollapsibleContent>
                    </Collapsible>
                    
                    
                    

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