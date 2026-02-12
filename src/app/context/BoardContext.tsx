import {createContext} from "react"
import { ColumnType } from "@/types/main.types";
import { SubscribeBoardSubscription } from "@/graphql/__generated__/graphql";

type BoardContextType = {
    handleSelectBoard(boardId:string):Promise<void>,
    board : SubscribeBoardSubscription | undefined,
    columns: ColumnType[] | undefined,
    addOneColumn(name:string): Promise<void>,
    editColumn(columndId:string, update:Pick<ColumnType, "name">): Promise<void>
    addOneCard(columnId : string, title: string, description: string, position:number, assignee: string): Promise<void>,
    removeOneCard(cardId:string):Promise<void>,
    editOneCard(id:string, title:string, description:string, position:number, userId:string):Promise<void>
}

export const BoardContext = createContext<BoardContextType | undefined>(undefined)
