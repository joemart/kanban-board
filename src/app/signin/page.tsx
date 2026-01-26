'use client'
import { useSignInEmailPassword } from "@nhost/nextjs";
import { useState } from "react";

const SignIn = () => {
    
    interface ValueType {
        email: string,
        password: string
    }
    const {signInEmailPassword} = useSignInEmailPassword()
    const [value, setValue] = useState<ValueType>({
        email: "",
        password: ""
    })

    

    const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) =>{
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
       
        setValue(v=>({...v, [name]:value}))
    }

    const handleSubmit:React.FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault()
        
        try{

            await signInEmailPassword(value.email, value.password);  
        }
        catch(e){
            console.log(e)
        }
        
    }



    return ( <section>
        <form method="POST" onSubmit={handleSubmit}>
            <input type="email" name="email" onChange={handleChange}/>
            <input type="password" name="password" onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    </section> );
}
 
export default SignIn;