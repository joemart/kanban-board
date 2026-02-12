'use client'

import { useQuery } from "@apollo/client"
import { GetCardsFromBoardIdDocument, GetCardDocument } from "@/graphql/__generated__/graphql"

export const useCards = (cardId: string)=>{
    const {data, loading, error} = useQuery(GetCardDocument, {variables: {id: cardId}})
    return {data, loading, error}
}

export const useCardsFromBoardId = (boardId: string)=>{
    const {data : cardsFromBoardID, loading, error, refetch : refetchCardsFromBoardId} = useQuery(GetCardsFromBoardIdDocument, {variables: {id: boardId}})
    return {cardsFromBoardID, loading, error, refetchCardsFromBoardId}
}
