'use client'
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/sidebar";
import Board from "@/components/board";
import Column from "@/components/board/column";
import Card from "@/components/board/column/card"
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd"
import { Button } from "./components/ui/button";
// Board
import { useBoards, useBoard } from "./queries/boards.graphql";
import { useEffect, useState } from "react";
import type { BoardType } from "./types/main.types";
import { BoardContext } from "./context/BoardContext";
import {useColumns} from "@/app/queries/columns.graphql"

export default function Home() {

    const [boardId, setBoardId] = useState("")
    const {data : columns} = useColumns() 
    const {data : board, refetch} = useBoard(boardId)
    useEffect(()=>{
       console.log(board)
    },[board])
    
    useEffect(()=>{
        console.log(columns)
    }, [columns])

    // column: add column
    // column: remove column
    // column: edit column

    // column: handle add card

    //board: handle select board

    const handleSelectBoard = async (boardId:string)=>{
        
        try{
            refetch({id: boardId})
        }catch(e){
            console.log(e)
        }
    }

    const onDragEnd = () =>{

    }

  return (
    <SidebarProvider className=" h-full min-h-auto flex gap-10" >
        <BoardContext.Provider value={{handleSelectBoard, boardId}}>
        <Sidebar />
            <DragDropContext onDragEnd={onDragEnd}>
            

                
                <Board>
                    <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
                        {(provided)=>(<>
                            <div className="flex gap-2.5" ref={provided.innerRef} {...provided.droppableProps}> 
                                {/* column map */}
                                
                                {/* <Column>
                                    <Card>
                                        <div>Cards</div> 
                                    </Card>
                                    <Card>
                                        <div>Cards</div>
                                    </Card>
                                    <Card>
                                        <div>Cards</div> 
                                    </Card>
                                    <Card>
                                        <div>Cards</div>
                                    </Card>
                                </Column>
                                <Column>
                                <Card>
                                    <div>Cards</div> 
                                </Card>
                                <Card>
                                    <div>Cards</div>
                                </Card>
                                <Card>
                                    <div>Cards</div> 
                                </Card>
                                <Card>
                                    <div>Cards</div>
                                </Card>
                                </Column> */}
                                {provided.placeholder}
                            </div>
                            <Button>Add column button</Button>
                            </>
                            )}
                    </Droppable>
                </Board>
            
            </DragDropContext>
        </BoardContext.Provider>
      </SidebarProvider> 
    
  );
}