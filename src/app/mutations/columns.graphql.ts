import { useMutation } from "@apollo/client";
import { UpdateColumnsOrderDocument } from "@/graphql/__generated__/graphql";

export const useColumnsUpdateOrder = () => {

    const [mutate, {data, error, loading}] = useMutation(UpdateColumnsOrderDocument)
    
    return {mutate, data, error, loading} ;
}

export const useAddColumn = () =>{
    
}