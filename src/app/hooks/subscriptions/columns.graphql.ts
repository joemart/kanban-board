import {  useSubscription } from "@apollo/client";
import { SubscribeAllColumnsCardsFromBoardIdDocument } from "@/graphql/__generated__/graphql";

export function useSubAllColumnsCardsFromBoardId(boardId: string){
    const {loading, error, data} = useSubscription(SubscribeAllColumnsCardsFromBoardIdDocument, {variables: {id: boardId}})
    return {loading, error, data}
}
