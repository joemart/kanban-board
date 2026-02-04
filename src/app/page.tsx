'use client'
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/sidebar";
import Board from "@/components/board";
import Column from "@/components/board/column";
import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd"
// Board
import { useBoard } from "./queries/boards.graphql";
import { useEffect, useState } from "react";
import { ColumnType, type BoardType } from "./types/main.types";
import { BoardContext } from "./context/BoardContext";
import {useColumns} from "@/app/queries/columns.graphql"
import { useColumnsUpdateOrder, useAddColumn, useDeleteColumnByID, useUpdateColumn } from "./mutations/columns.graphql";
import AddColumnButton from "./components/board/addColumn";

export default function Home() {

    const [boardId, setBoardId] = useState("")
    const {data : board, refetch} = useBoard(boardId)
    const {data : columnsData, loading, error} = useColumns() 
    const {mutate} = useColumnsUpdateOrder()
    const {addColumn} = useAddColumn()
    const {deleteColumn} = useDeleteColumnByID()
    const {updateOneColumn} = useUpdateColumn()

    const [columns, setColumns] = useState<ColumnType[]>()

    useEffect(()=>{
        if(columnsData && columnsData.columns)
            setColumns(columnsData.columns)
        
    }, [columnsData])

    // column: add column

    const addOneColumn =  async (name: string) =>{
        if(!columns) return
        await addColumn({
            variables: {
                object: {
                   
                    name, 
                    board_id : boardId,
                    position: columns.length
                }},
                onError: (error)=>{
                    console.log(error)
                },
            onCompleted: (data)=>{
                setColumns(columns=>{
                    if(!columns) return;
                    const col = data.insert_columns_one;
                    return [...columns, {id:col.id, board_id: col.board_id, name: col.name, position: col.position}]
                })
            }
            })
    }
    // column: remove column
    const removeColumn = async(columnId: string) =>{
        deleteColumn({
            variables: {
                id : columnId
            },
            onCompleted: (data=>{
                setColumns(columns => {

                    if(!columns) return
                    const id = data.delete_columns_by_pk.id;
                    return columns.filter(c => c.id != id)

                })
                console.log(data)
            })
        })
    }
    // column: edit column

    const editColumn = async(columnId: string, update: Pick<ColumnType, "name"> ) =>{
        updateOneColumn({
            variables: {
                id: columnId,
                update
            }
        })
    }

    // column: handle add card

    // column: remove card

    // column: edit card

    //board: handle select board

    const handleSelectBoard = async (boardId:string)=>{
        setBoardId(boardId)
        try{
            await refetch({id: boardId})
        }catch(e){
            console.log(e)
        }
    }

    const onDragEnd = (result: DropResult) =>{
        const {destination, source, draggableId, type} = result

        if(!columns) return
        if(!destination) return
        if(destination.droppableId == source.droppableId && destination.index == source.index) return

        if(type=="COLUMN")
        {   
                const c = [...columns]
                const [movedColumn] = c.splice(source.index, 1)
                c.splice(destination.index, 0, movedColumn)
                const reordered = c.map((c,i) => ({...c , position : i}))

                setColumns(reordered)

                const updates = reordered.map((item) => ({
                                where: {
                                    _and:[
                                        {id: { _eq: item.id }},
                                        {board_id: { _eq: item.board_id }} 
                                    ]
                                },
                                _set: { position: item.position }
                                }));
                mutate({
                    variables:{updates},
                    onError: (e)=>{
                        console.log(e)

                    },
                    onCompleted: (data)=>{
                        setColumns(data.update_columns_many.map((column:{returning:BoardType[]})=> (column.returning.pop())))

                    }
                })    
        }
        
    }

  if (loading) {
    return <div>Loading columns...</div>;
  }

  if (error) {
    return (
      <div>
        <h3>Error Loading Columns</h3>
        <p>{error.message}</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (!columns) {
    return <div>No columns data returned (null/undefined)</div>;
  }

  return (
    <SidebarProvider className=" h-full min-h-auto flex gap-10" >
        <BoardContext.Provider value={{handleSelectBoard, board, addOneColumn, columns, editColumn}}>
        <Sidebar />
            <DragDropContext onDragEnd={onDragEnd}>
                <Board>
                    <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
                        {(provided)=>(
                            <div className="flex gap-2.5" ref={provided.innerRef} {...provided.droppableProps}> 
                                {loading ? "loading..." : columns.map((x, index)=><Draggable index={index} key={x.id} draggableId={x.id}>
                                        {(provided)=>{
                                            return <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                <Column name={x.name} removeColumn = {()=>removeColumn(x.id)} columnId = {x.id}>
                                                    Card
                                                    </Column>
                                            </div>
                                        }}
                                </Draggable> )}
                                {provided.placeholder}
                                <AddColumnButton  />
                            </div>
                            )}
                    </Droppable>
                </Board>
            
            </DragDropContext>
        </BoardContext.Provider>
      </SidebarProvider> 
    
  );
}