import { GetAllColumnsDocument, GetAllColumnsQuery, GetAllColumnsQueryVariables, GetColumnQuery, GetColumnQueryVariables } from "@/graphql/__generated__/graphql";
import { GetColumnDocument } from "@/graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";

export function useColumns(){
    const {data, error, loading, refetch} = useQuery<GetAllColumnsQuery, GetAllColumnsQueryVariables>(GetAllColumnsDocument);
    return {data,error,loading, refetch}
}

export function useColumn(columnId: string){
    const {data,error,loading, refetch} = useQuery<GetColumnQuery, GetColumnQueryVariables>(GetColumnDocument, {variables:{id : columnId}})
    return {data,error,loading, refetch}
}