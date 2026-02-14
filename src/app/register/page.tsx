'use client'
import { useSignUpEmailPassword } from "@nhost/nextjs";
import {useForm} from "react-hook-form"
import Form from "@/components/form";
import { useRouter } from "next/navigation";

type FormType = {
    email:string, 
    password:string, 
    confirmPassword?:string
}


const Register = () => {
    const {signUpEmailPassword} = useSignUpEmailPassword()
    const {register, handleSubmit, formState:{errors}, watch} = useForm<FormType>()
    const router = useRouter()

    const onSubmit = async ({email, password} : FormType)=>{
 
        try{
            const {accessToken} = await signUpEmailPassword(email, password, {allowedRoles: ["user", "me"], defaultRole: "user"})
            fetch("/api/auth", {
                method:"POST",
                headers: {"Content-type" : "application/json"},                  
                body:JSON.stringify({email, password, accessToken})
            })
            router.push("/")
        }
        catch(e){
            console.log(e)
        }
    }

    return ( 

        <Form 
        register={register} 
        handleSubmit={handleSubmit} 
        onSubmit={onSubmit} 
        errors={errors} 
        watch={watch} 
        
        header={"Register"}
        description={"Enter an email to register to Kanban Board"}
        confirmPassword 
        
        ></Form>

 );
}
 
export default Register;