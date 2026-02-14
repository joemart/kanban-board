'use client'
import { useSignInEmailPassword } from "@nhost/nextjs";
import { useRouter } from "next/navigation";
import Form from "../components/form";
import {useForm} from "react-hook-form"

type FormType = {
    email:string, 
    password:string
}


const SignIn = () => {

    const {register, handleSubmit:handleSub, watch, formState:{errors}} = useForm<FormType>()
    const {signInEmailPassword} = useSignInEmailPassword()
    const router = useRouter()

    const onSubmit = async ({email, password} : FormType) =>{

        const {accessToken} = await signInEmailPassword(email, password);
        
        await fetch("/api/auth", {
            method:"POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email,password,accessToken})
        })

        router.push("/")

    }

    return ( 
        <Form 
        register={register} 
        handleSubmit={handleSub} 
        errors={errors} 
        onSubmit={onSubmit} 
        watch={watch} 
        
        description = {"Enter an email to sign in to Kanban Board"}
        header = {"Sign in"}
        confirmPassword={false}
        
        />
    );
}
 
export default SignIn;