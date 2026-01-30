import { GetAllColumnsDocument } from "@/graphql/__generated__/graphql";
import { GetColumnDocument } from "@/graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";

export function useColumns(){
    const {data, error, loading} = useQuery(GetAllColumnsDocument);
    return {data,error,loading}
}

export function useColumn(columnId: string){
    const {data,error,loading, refetch} = useQuery(GetColumnDocument, {variables:{id : columnId}})
    return {data,error,loading, refetch}
}