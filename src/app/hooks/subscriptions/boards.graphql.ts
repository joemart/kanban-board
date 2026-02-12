import { useSubscription } from "@apollo/client";
import { SubscribeAllBoardsDocument, SubscribeBoardDocument } from "@/graphql/__generated__/graphql";


export function useSubBoards(){
    const {data: dataSubBoards, error, loading} = useSubscription(SubscribeAllBoardsDocument, {
        onError: (error)=>{
            console.log("Subscription subBoards error: ",error)
        }
    })
    return {dataSubBoards , error, loading}
}

export function useSubBoard(boardId:string){
    const {data, error, loading} = useSubscription(SubscribeBoardDocument, {variables:{id:boardId}})
    return {data, error, loading}
}