'use client'
import {Card, CardHeader, CardContent, CardAction, CardDescription, CardTitle} from "@/ui/card";
import { useContext } from "react";
import { BoardContext } from "@/app/context/BoardContext";

const Board = ({children}: {children: React.ReactNode}) => {


    const context = useContext(BoardContext)
    if(!context)return
    if(!context.board) return
    if(!context.board.boards_by_pk) return


    return ( <Card className=" w-full flex">
                <CardHeader>
                    <CardTitle>
                        {context.board.boards_by_pk.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex h-full gap-3.5">
                        { children} 
                </CardContent>
            </Card>);
}
 
export default Board;