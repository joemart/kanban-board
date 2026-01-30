'use client'
import {Card, CardHeader, CardContent, CardAction, CardDescription, CardTitle} from "@/ui/card";
import {Badge} from "@/ui/badge"

const Board = ({children}: {children: React.ReactNode}) => {



    return ( <Card className=" w-full flex">
                <CardHeader>
                    <CardTitle>
                        Project name
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex h-full gap-3.5">
                        {children} 
                </CardContent>
            </Card>);
}
 
export default Board;