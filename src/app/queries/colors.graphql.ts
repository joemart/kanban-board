import { useQuery } from "@apollo/client";
import { GetAllColorsDocument } from "@/graphql/__generated__/graphql";

export function useColors () {
       const {loading, error, data} = useQuery(GetAllColorsDocument)
    
        return {loading, error, data}
}