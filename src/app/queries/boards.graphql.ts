'use client'
import { useQuery  } from "@apollo/client";

import { GetAllBoardsDocument, GetAllBoardsQuery, GetAllBoardsQueryVariables, GetBoardQuery, GetBoardQueryVariables } from "@/graphql/__generated__/graphql";
import { GetBoardDocument } from "@/graphql/__generated__/graphql";

export function useBoards () {
    const {loading, error, data} = useQuery<GetAllBoardsQuery, GetAllBoardsQueryVariables>(GetAllBoardsDocument)
    return {loading, error, data}
}

export function useBoard (boardId : string) {
    const {loading, error, data, refetch} = useQuery<GetBoardQuery, GetBoardQueryVariables>(GetBoardDocument, {variables: {id: boardId}})
     return {loading, error, data, refetch}
}

