import { useMutation } from "@apollo/client";
import { AddCardDocument, RemoveCardDocument, EditCardDocument, UpdateColumnCardOrderDocument, UpdateCardOrderDocument } from "@/graphql/__generated__/graphql";

export const useUpdateCardOrder = () =>{
    const [updateCardOrder] = useMutation(UpdateCardOrderDocument)
    return {updateCardOrder}
}

export const useUpdateColumnCardOrder = () =>{
    const [updateColumnCardOrder] = useMutation(UpdateColumnCardOrderDocument)
    return {updateColumnCardOrder}
}

export const useAddCard = () =>{
    const [addCard, {data}] = useMutation(AddCardDocument)
    return {addCard, data}
}

export const useRemoveCard = () =>{
    const [removeCard, {data}] = useMutation(RemoveCardDocument)
    return {removeCard, data}
}

export const useEditCard = () =>{
    const [editCard, {data}] = useMutation(EditCardDocument)
    return {editCard, data}
}