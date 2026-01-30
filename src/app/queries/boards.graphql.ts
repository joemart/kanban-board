'use client'
import { useQuery  } from "@apollo/client";

import { GetAllBoardsDocument } from "@/graphql/__generated__/graphql";
import { GetBoardDocument } from "@/graphql/__generated__/graphql";

export function useBoards () {

    const {loading, error, data} = useQuery(GetAllBoardsDocument)

    return {loading, error, data}

}

export function useBoard (boardId : string) {
    const {loading, error, data, refetch} = useQuery(GetBoardDocument, {variables: {id: boardId}})
     return {loading, error, data, refetch}
}

