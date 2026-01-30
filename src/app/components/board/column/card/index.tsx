'use client'
import {Card as CardMain, CardContent, CardHeader} from "@/ui/card"


const Card = ({children}:{children:React.ReactElement}) => {


return ( <CardMain >
        <CardHeader>

            {/* Card name */}
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </CardMain> );
}
 
export default Card;