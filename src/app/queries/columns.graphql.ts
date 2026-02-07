import { GetAllColumnsAllCardsDocument, GetAllColumnsAllCardsQuery, GetAllColumnsAllCardsQueryVariables, GetColumnQuery, GetColumnQueryVariables } from "@/graphql/__generated__/graphql";
import { GetColumnDocument } from "@/graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";

export function useColumnsCards(){
    const {data, error, loading, refetch} = useQuery<GetAllColumnsAllCardsQuery, GetAllColumnsAllCardsQueryVariables>(GetAllColumnsAllCardsDocument);
    return {data,error,loading, refetch}
}

export function useColumn(columnId: string){
    const {data,error,loading, refetch} = useQuery<GetColumnQuery, GetColumnQueryVariables>(GetColumnDocument, {variables:{id : columnId}})
    return {data,error,loading, refetch}
}