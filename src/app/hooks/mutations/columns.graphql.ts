import { useMutation } from "@apollo/client";
import { UpdateColumnsOrderDocument, InsertOneColumnDocument, DeleteColumnByIdDocument, UpdateOneColumnDocument } from "@/graphql/__generated__/graphql";

export const useUpdateColumnsOrder = () => {
    const [updateColumnOrder, {data, error, loading}] = useMutation(UpdateColumnsOrderDocument)
    return {updateColumnOrder, data, error, loading} ;
}

export const useAddColumn = () =>{
    const [addColumn, {data , error, loading}] = useMutation(InsertOneColumnDocument)
    return {addColumn, data, error, loading}
}

export const useDeleteColumnByID = () =>{
    const [deleteColumn, {data, error, loading}] = useMutation(DeleteColumnByIdDocument)
    return {deleteColumn, data, error, loading}
}  

export const useUpdateColumn = () =>{
    const [updateOneColumn, {data, error, loading}] = useMutation(UpdateOneColumnDocument)
    return {updateOneColumn, data, error, loading}
}