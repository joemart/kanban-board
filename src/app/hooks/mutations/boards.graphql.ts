import { useMutation } from "@apollo/client";
import { AddBoardDocument, DeleteBoardDocument, EditBoardDocument } from "@/graphql/__generated__/graphql";

export const useAddBoard = ()=> {
    const [addBoard] = useMutation(AddBoardDocument)
    return {addBoard};
}

export const useDeleteBoard = ()=> {
    const [deleteBoard] = useMutation(DeleteBoardDocument)
    return {deleteBoard};
}

export const useEditBoard = ()=> {
    const [editBoard] = useMutation(EditBoardDocument)
    return {editBoard};
}
