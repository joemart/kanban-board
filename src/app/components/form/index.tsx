
import {UseFormWatch} from "react-hook-form"
import { Input } from "@/ui/input";
import { Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";

import { UseFormRegister, UseFormHandleSubmit, FieldErrors } from "react-hook-form";
import { FieldError } from "@/ui/field";


type FormType = {email:string, password:string, confirmPassword?:string}

const Form = ({register, handleSubmit, errors, onSubmit, confirmPassword, header, description} : {register: UseFormRegister<FormType>,
handleSubmit: UseFormHandleSubmit<FormType>, errors: FieldErrors<FormType>, onSubmit: (data:FormType)=>void,
watch: UseFormWatch<FormType>, confirmPassword: boolean, header:string, description:string}) => {

    return (         
    <section className="flex flex-col justify-center items-center h-full"><Card className="flex flex-col justify-center items-center w-125 ">
            <CardHeader className="w-full">
                <CardTitle className=" text-5xl">{header}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="w-full">
                <form className="flex flex-col gap-3" id="register-form" action="" onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="email">Email </Label>
                    <Input id={"email"} type="email" {...register("email", {
                        minLength : {message: "Must contain at least 3 characters", value:3},
                        maxLength: {message: "Maximum of 25 characters", value: 25}
                    })} aria-invalid={errors.email ? true : false}/>
                    {errors.email && <FieldError errors={[errors.email]}/>}

                    <Label htmlFor="password">Password </Label>
                    <Input id={"password"} type="password" {...register("password", {
                        minLength : {message: "Must contain at least 3 characters", value:3},
                        maxLength: {message: "Maximum of 20 characters", value: 20}
                    })} aria-invalid={errors.password ? true : false}/>
                    {errors.password && <FieldError errors={[errors.password]}/>}

                  {confirmPassword ? <><Label htmlFor="confirmPassword">Confirm Password </Label>
                    <Input id={"confirmPassword"} type="password" {...register("confirmPassword", {
                        minLength : {message: "Must contain at least 3 characters", value:3},
                        maxLength: {message: "Maximum of 20 characters", value: 20},
                        validate: (value, formValues) => value === formValues.password || "Passwords don't match"
                    })} aria-invalid={errors.confirmPassword ? true : false}/>
                    {errors.confirmPassword && <FieldError errors={[errors.confirmPassword]}/>}</> : <></>}                      
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" form="register-form">Submit</Button>
            </CardFooter>
        </Card> </section>);
}
 
export default Form;