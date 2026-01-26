'use client'
import { useSignUpEmailPassword } from "@nhost/nextjs";
import { useState } from "react";

type RegisterValue = {
    email: string,
    password: string
}



const Register = () => {
    const {signUpEmailPassword} = useSignUpEmailPassword()


    const [value, setValue] = useState<RegisterValue>({
        email : "",
        password: ""
    })

    const handleChange : React.ChangeEventHandler<HTMLInputElement> = (e) => {
      
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        setValue(v=> ({...v, [name] : value}))
    }

    const onSubmit: React.MouseEventHandler<HTMLFormElement> = async (e)=>{
        
        e.preventDefault()
        try{
            signUpEmailPassword(value.email, value.password)
        }catch(e){
            console.log(e)
        }
        
    }

    return ( <section>
        <div>
            <span>Register</span>
            <form method="POST" onSubmit={onSubmit}>
                <input type="email" name="email" onChange={handleChange}/>
                <input type="password" name="password" onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>       
    </section> );
}
 
export default Register;