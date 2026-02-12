'use client'

import { useEffect, useRef, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/sidebar";
import Board from "@/components/board";
import Column from "@/components/board/column";
import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd"
// Board

import { useSubBoard } from "./hooks/subscriptions/boards.graphql";
import { useSubAllColumnsCardsFromBoardId } from "./hooks/subscriptions/columns.graphql";
import { CardType, ColumnType } from "./types/main.types";
import { BoardContext } from "./context/BoardContext";
import { useUpdateColumnsOrder, useAddColumn, useDeleteColumnByID, useUpdateColumn } from "./hooks/mutations/columns.graphql";
import AddColumnButton from "./components/board/addColumn";
// Card
import { useAddCard, useEditCard, useRemoveCard, useUpdateCardOrder, useUpdateColumnCardOrder } from "./hooks/mutations/cards.graphql";

export default function Home() {

    const [boardId, setBoardId] = useState("")
    const {data : board} = useSubBoard(boardId)
    const shouldInitializeRef = useRef(true)
    const [columns, setColumns] = useState<ColumnType[]>([])
    const {data : columnsData, loading} = useSubAllColumnsCardsFromBoardId(boardId)
    
    
    //columns
    const {updateColumnOrder} = useUpdateColumnsOrder()
    const {addColumn} = useAddColumn()
    const {deleteColumn} = useDeleteColumnByID()
    const {updateOneColumn} = useUpdateColumn()

    //cards
    const {addCard} = useAddCard()
    const {removeCard} = useRemoveCard()
    const {editCard} = useEditCard()
    const {updateCardOrder} = useUpdateCardOrder()

   
    useEffect(()=>{

        if(columnsData && columnsData.columns ){
            setColumns(columnsData.columns)

        }

    }, [columnsData])




    // column: add column
    const addOneColumn =  async (name: string):Promise<void> =>{
        try{
            if(!columns) return
            
            const optimisticColumn = {
                id:crypto.randomUUID(),
                board_id: boardId,
                name,
                cards: [],
                position: columns.length
            }

            setColumns(cols=>([...cols, optimisticColumn]))

            const optimisticObject = {...optimisticColumn, cards:{data:[]}}

            await addColumn({
            variables: {
                object: optimisticObject},
                onError: (error)=>{
                    console.log(error)
                }
            })  
        }catch(e){
            console.log(e)
        }
        
    }

    // column: remove column
    const removeColumn = async(columnId: string):Promise<void> =>{
        try{

            await deleteColumn({
                variables: {
                    id : columnId
                }
            })  
        }catch(e)
        {
            console.log(e)
        }
        
    }

    // column: edit column
    const editColumn = async(columnId: string, update: Pick<ColumnType, "name"> ):Promise<void> =>{
        try{
            
           await updateOneColumn({
            variables: {
                id: columnId,
                update
            }
        }) 
        }
        catch(e)
        {
            console.log(e)
        }
        
    }

    // column: handle add card
    const addOneCard = async(columnId: string, title:string, description: string, position: number, assignee: string):Promise<void> =>{
        try{

            const cols = [...columns]
            const newCard : CardType = {
                            id : crypto.randomUUID(),
                            column_id: columnId,
                            title,
                            description,
                            position,
                            assignee
                        }
            const optimisticColumns = cols.map(col=> {

                if(col.cards && col.id == columnId){
                    return {...col, cards: [...col.cards, newCard]}
                }
                return col
            })
            // console.log(optimisticColumns)
            setColumns(optimisticColumns)

            await addCard({
                variables: {
                    object: {...newCard}
                }
            })
        }catch(e){
            console.log(e)
        }
    }

    // column: remove card
    const removeOneCard = async(cardId: string) : Promise<void>=>{

        removeCard({
            variables: {
                id : cardId
            },

        })
    }

    // column: edit card
    const editOneCard = async(id:string, title:string, description:string, position:number, userId:string)=>{
        
        editCard({
            variables: {
                id,
                set:{title, description}
            }
        })
    }
    
    //board: handle select board

    const handleSelectBoard = async (boardId:string)=>{
        shouldInitializeRef.current = true
        setBoardId(boardId)

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
                const reordered = c.map((c,i) => ({...c , position : i, cards: c.cards}))
                setColumns(reordered)

                const updates = reordered.map((item) => ({
                                where: {
                                    _and:[
                                        {id: { _eq: item.id }},
                                        {board_id: { _eq: boardId }} 
                                    ]
                                },
                                _set: { position: item.position }
                                }));
                                
                updateColumnOrder({
                    variables:{updates},
                    onError: (e)=>{
                            console.log(e)
                        }
                })    
        }
        
        if(type=="CARD"){
            const columnStart = columns.findIndex(col=>col.id == source.droppableId)
            const columnFinish = columns.findIndex(col=> col.id == destination.droppableId)
            
            if(columnStart == columnFinish){
                
                const cards = [...columns[columnStart].cards || []]
                const [card] = cards.splice(source.index, 1)
                cards.splice(destination.index, 0, card)

                setColumns( cols =>{
                    if(!cols)return cols

                    const newColumns = [...cols]
                    newColumns[columnStart] = {
                        ...cols[columnStart], cards
                    }
                    return newColumns

                } )

                const updates = cards.map((card, index)=>{

                    return { 
                        where: {_and:[
                            {column_id : {_eq: card.column_id}},
                            {id : {_eq: card.id}}
                            ]},
                        _set: { position: index}
                    }
                })

                updateCardOrder({
                    variables: {updates},
                    onError: (error)=>{
                        console.log(error)
                    }
                })

            }   

            if(columnStart != columnFinish){

                const cols = [...columns]
                const cardsStart =[ ...cols[columnStart].cards || []]
                const cardsFinish = [...cols[columnFinish].cards || []]
                const [card] = cardsStart.splice(source.index, 1)
                const updatedCard = {...card, column_id: cols[columnFinish].id}
                cardsFinish.splice(destination.index,0, updatedCard)

                cols[columnStart] = {...cols[columnStart] , cards: cardsStart}
                cols[columnFinish] = {...cols[columnFinish], cards: cardsFinish}

                // Updating position from 0 to n
                if(cols[columnStart].cards)
                cols[columnStart] = {...cols[columnStart], cards: cols[columnStart].cards.map((card,i) => ({...card, position:i}))}
                if(cols[columnFinish].cards)
                cols[columnFinish] = {...cols[columnFinish], cards: cols[columnFinish].cards.map((card,i) => ({...card, position:i}))}
                
                setColumns(cols)
                
                const updates = []
                cardsStart.forEach((card, index)=>{
                    updates.push( {
                        where: {column_id : {_eq: cols[columnStart].id},
                        id: {_eq: card.id}},
                        _set: {position: index}
                    })
                })

                cardsFinish.forEach((c, index)=>{
                    if(c.id != card.id)
                     updates.push({
                        where: {column_id : {_eq: cols[columnFinish].id},
                        id: {_eq: c.id}},
                        _set: {position: index, column_id: cols[columnFinish].id}
                    })
                })

                updates.push({
                    where: {id: {_eq: card.id}},
                    _set:{
                        position: destination.index,
                        column_id: cols[columnFinish].id
                    }
                })

                updateCardOrder({
                    variables:{updates},
                    onError: (error) =>{
                        console.log(error)
                    }
                })
            }

        }
    }

  if (loading) {
    return <div>Loading columns...</div>;
  }

  return (
    <SidebarProvider className=" h-full min-h-auto flex gap-10" >
        <BoardContext.Provider value={{handleSelectBoard, board, addOneColumn, columns, editColumn, addOneCard, removeOneCard, editOneCard}}>
        <Sidebar />
            <DragDropContext onDragEnd={onDragEnd}>
                <Board>
                    <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
                        {(provided)=>(
                            <div className="flex gap-2.5" ref={provided.innerRef} {...provided.droppableProps}> 
                                
                                {loading ? "loading..." : columns.map((column, index)=><Draggable index={index} key={column.id} draggableId={column.id}>
                                        {(provided)=>{
                                            return <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                <Column name={column.name} removeColumn = {()=>removeColumn(column.id)} columnId = {column.id} cards = {column.cards || []}></Column>
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