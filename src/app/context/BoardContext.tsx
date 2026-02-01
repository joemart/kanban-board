import {createContext} from "react"
import { BoardType } from "../types/main.types";
import { GetBoardQuery } from "@/graphql/__generated__/graphql";

type BoardContextType = {
    handleSelectBoard(boardId:string):void,
    board : GetBoardQuery | undefined
}
export const BoardContext = createContext<BoardContextType | undefined>(undefined)
