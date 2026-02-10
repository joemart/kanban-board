'use client'
import { useQuery, useLazyQuery  } from "@apollo/client";

import { GetAllBoardsDocument, GetAllBoardsQuery, GetAllBoardsQueryVariables, GetBoardQuery, GetBoardQueryVariables, GetAllColumnsAllCardsDocument, GetAllColumnsCardsFromBoardIdDocument } from "@/graphql/__generated__/graphql";
import { GetBoardDocument } from "@/graphql/__generated__/graphql";

export function useBoards () {
    const {loading, error, data, refetch} = useQuery<GetAllBoardsQuery, GetAllBoardsQueryVariables>(GetAllBoardsDocument)
    return {loading, error, data, refetch}
}

export function useBoard (boardId : string) {
    const {loading, error, data, refetch} = useQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, {variables: {id: boardId}})
     return {loading, error, data, refetch}
}

export function useAllColumnsCardsFromBoardId(boardId: string){
    const {loading, error, data, refetch: refetchAllColumnsCardsFromBoardId} = useQuery(GetAllColumnsCardsFromBoardIdDocument, {variables: {id: boardId}})
    return {loading, error, data, refetchAllColumnsCardsFromBoardId}
}
