import {createContext} from "react"
import { BoardType } from "../types/main.types";

type BoardContextType = {
    handleSelectBoard(boardId:string):void,
    boardId : string
}
export const BoardContext = createContext<BoardContextType | undefined>(undefined)

// const BoardContextProvider = ({children}:{children:React.ReactNode}) => {
    
    
//     return ( <BoardContext.Provider value={undefined}>{children}</BoardContext.Provider> );
// }

// export default BoardContextProvider;