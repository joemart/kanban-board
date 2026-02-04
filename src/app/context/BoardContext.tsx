import {createContext} from "react"
import { ColumnType } from "@/types/main.types";
import { GetBoardQuery } from "@/graphql/__generated__/graphql";

type BoardContextType = {
    handleSelectBoard(boardId:string):void,
    board : GetBoardQuery | undefined,
    addOneColumn(name:string): void,
    columns: ColumnType[],
    editColumn(columndId:string, update:Pick<ColumnType, "name">): void
}

export const BoardContext = createContext<BoardContextType | undefined>(undefined)
