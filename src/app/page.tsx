'use client'
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/sidebar";
import Board from "@/components/board";
import Column from "@/components/board/column";
import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd"
// Board
import { useBoard } from "./queries/boards.graphql";
import { useEffect, useRef, useState } from "react";
import { CardType, ColumnType } from "./types/main.types";
import { BoardContext } from "./context/BoardContext";
import {useColumnsCards} from "@/app/queries/columns.graphql"
import { useUpdateColumnsOrder, useAddColumn, useDeleteColumnByID, useUpdateColumn } from "./mutations/columns.graphql";
import AddColumnButton from "./components/board/addColumn";
// Card
import { useAddCard, useEditCard, useRemoveCard, useUpdateCardOrder, useUpdateColumnCardOrder } from "./mutations/cards.graphql";


export default function Home() {

    const [boardId, setBoardId] = useState("")
    const {data : board, refetch} = useBoard(boardId)
    const {data : columnsData, loading, error} = useColumnsCards()
    const shouldInitializeRef = useRef(true)
    //columns
    const {updateColumnOrder} = useUpdateColumnsOrder()
    const {addColumn} = useAddColumn()
    const {deleteColumn} = useDeleteColumnByID()
    const {updateOneColumn} = useUpdateColumn()

    //cards
    const {addCard} = useAddCard()
    const {removeCard} = useRemoveCard()
    const {} = useEditCard()
    const {updateCardOrder} = useUpdateCardOrder()
    const {updateColumnCardOrder} = useUpdateColumnCardOrder()

    const [columns, setColumns] = useState<ColumnType[]>()
    const [cards, setCards] = useState<CardType[][]>()

    useEffect(()=>{
        if(columnsData && columnsData.columns && shouldInitializeRef.current){
            setColumns(columnsData.columns)
            shouldInitializeRef.current = false
        }

    }, [columnsData])


    // column: add column
    const addOneColumn =  async (name: string):Promise<void> =>{
        try{
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
                    return [...columns, {id:col.id, board_id: col.board_id, name: col.name, position: col.position, cards: []}]
                })
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
                },
                onCompleted: (data=>{
                    setColumns(columns => {

                        if(!columns) return
                        const id = data.delete_columns_by_pk.id;
                        return columns.filter(c => c.id != id)

                    })
                })
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
            await addCard({
                variables: {
                    object: {
                        columnId,
                        title,
                        description,
                        position,
                        assignee
                    }
                }
            })
        }catch(e){
            console.log(e)
        }
    }

    // column: remove card
    const removeOneCard = async(cardId: string, position: number) : Promise<void>=>{
        removeCard({
            variables: {
                id : cardId
            },
            onCompleted: (data)=>{
                console.log(data)
                setColumns(cols => {
                    if(!cols) return
                    const temp = [...cols]
                    // return [...temp, temp[position].cards.filter(card => card.id != data.delete_cards_by_pk.id)]
                    const result = temp.map(column =>{
                        if(column.position == position)
                        {
                            const result = column.cards.filter(card=>{
                                return (card.id != cardId)  
                            })
                            return {...column, result }
                        }
                        return column
                    })
                    return result
                    // return [...temp, temp[position]]
                })
            }
        })
    }

    // column: edit card

    //board: handle select board

    const handleSelectBoard = async (boardId:string)=>{

        // setCards(()=>{
        //     const temp = cardsFromBoardID.reduce((acc:CardType[][],card:CardType) =>{
        //         if(!acc[card.position])
        //             acc[card.position] = []
        //         acc[card.position].push(card)
        //         return acc
        //     }, {})
        //     console.log(temp)
        //     return temp
        // })
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
                const reordered = c.map((c,i) => ({...c , position : i, cards: c.cards}))
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
                                
                updateColumnOrder({
                    variables:{updates},
                    
                    onCompleted: (data)=>{
                        // console.log(data)
                        // setColumns(data.update_columns_many.map((column:{returning:BoardType[]})=> (column.returning.pop())))
                    },
                    onError: (e)=>{
                            console.log(e)
                        }
                })    
        }
        
        if(type=="CARD"){
            const columnStart = columns.findIndex(col=>col.id == source.droppableId)
            const columnFinish = columns.findIndex(col=> col.id == destination.droppableId)
            
            if(columnStart == columnFinish){
                
                const cards = [...columns[columnStart].cards]
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
                    onCompleted: (data)=>{
                        // const updatedCards = data.update_cards_many.map((card:{returning:CardType[]})=>({...card.returning[0]}))
                        // const cols = [...columns]
                        // cols[columnStart] = {
                        //     ...cols[columnStart], cards:updatedCards
                        // }
                        // setColumns(cols)
                    },
                    onError: (error)=>{
                        console.log(error)
                    }
                })

            }   

            if(columnStart != columnFinish){

                const cols = [...columns]
                const cardsStart =[ ...cols[columnStart].cards]
                const cardsFinish = [...cols[columnFinish].cards]
                const [card] = cardsStart.splice(source.index, 1)
                const updatedCard = {...card, column_id: cols[columnFinish].id}
                cardsFinish.splice(destination.index,0, updatedCard)

                cols[columnStart] = {...cols[columnStart] , cards: cardsStart}
                cols[columnFinish] = {...cols[columnFinish], cards: cardsFinish}

                setColumns(cols)
                const updates:unknown[] = []
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

  if(!columnsData) return

  return (
    <SidebarProvider className=" h-full min-h-auto flex gap-10" >
        <BoardContext.Provider value={{handleSelectBoard, board, addOneColumn, columns, editColumn, addOneCard, removeOneCard}}>
        <Sidebar />
            <DragDropContext onDragEnd={onDragEnd}>
                <Board>
                    <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
                        {(provided)=>(
                            <div className="flex gap-2.5" ref={provided.innerRef} {...provided.droppableProps}> 
                                {loading ? "loading..." : columns.map((column, index)=><Draggable index={index} key={column.id} draggableId={column.id}>
                                        {(provided)=>{
                                            return <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                                <Column name={column.name} removeColumn = {()=>removeColumn(column.id)} columnId = {column.id} cards = {column.cards}></Column>
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