'use client'
import { Card, CardHeader, CardContent, CardTitle } from "@/ui/card";


const Column = ({children, name} : {children: React.ReactNode, name: string}) => {

    //handle title column change
    //handle add card

    //To Do, In Progress, Review, Done

    return ( <Card className=" flex flex-col h-full flex-[1_1_200px] max-w-55 min-w-40">
        <CardHeader >
            <CardTitle>
                {name}
            </CardTitle>
        </CardHeader>
        <CardContent className=" flex flex-col gap-3">
            {children}
        </CardContent>
    </Card> );
}
 
export default Column;