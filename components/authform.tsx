"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { createAccount } from "@/lib/useractions/action"
import OtpModal from "./otp-modal"
// import createAccount from "@/lib/actions/user.actions"
// import OtpModal from "./otpmodel"

type FormType = "sign-in" | "sign-up"; 

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email({
      message: "Invalid email address"
    }),
  fullname: formType === "sign-up" ? z.string().min(1, {
    message: "Name should be greater than 1 character"
  }): z.string().optional(),
})
}


const AuthForm = ({type} : {type : FormType}) => {

   const [isloading, setIsLoading] = useState(false)
   const [errorMessage, setErrorMessage] = useState<string | null>(null) 
   const[accountId, setAccountId] = useState(null)
   
   const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
    },
  })
 
//   2. Define a submit handler.
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");   
    try{
      const user = await createAccount({fullname : values.fullname || "" , email : values.email})

      setAccountId(user.accountId)
    }catch{
      setErrorMessage("failed to create account please try again")
    }finally{
      setIsLoading(false)
    }


    console.log(values)
  }

    return (<>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8">
        <h1 className="text-center text-light-100 md:text-left text-[34px] leading-[42px] font-bold ">
            Enter your email to set it as the enquiry email.
        </h1>
        <p className="text-center">After verification you will be send to the home page and your email will be set as the new enquiry email</p>
        {type === "sign-up" && (
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1 ">
                  <FormLabel className="text-light-100 pt-2 w-full">Full name</FormLabel>

                  <FormControl>
                    <Input required placeholder="Enter your full name" {...field} />
                  </FormControl>
              </div>
              <FormMessage className="text-red ml-4 text-[14px] leading-[20px] font-normal" />
            </FormItem>
          )}
        />
      )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                  <FormLabel className="text-light-100 pt-2 w-full text-[14px] leading-[20px] font-normal">Email</FormLabel>

                  <FormControl>
                    <Input required placeholder="Enter your email" {...field} />
                  </FormControl>
              </div>
              <FormMessage className="text-red ml-4 text-[14px] leading-[20px] font-normal" />
            </FormItem>
          )}
        />
        <Button type="submit" className=" h-[66px] bg-black hover:bg-gray-700 text-white transition-all rounded-full" disabled={isloading}>
          {type === "sign-in" ? "Sign In" : "Sign Up"}

          {isloading && (
            <Image
              src="/assets/icons/loader.svg"
              alt="loading"
              width={20}
              height={20}
              className="ml-2 animate-spin"
            ></Image>
          )}
        </Button>

        {errorMessage && <p className="mx-auto w-fit rounded-xl bg-error/5 px-8 py-4 text-center text-error text-[14px] leading-[20px] font-normal">
          {errorMessage}
        </p>}
      </form>
    </Form>

    {accountId && <OtpModal email={form.getValues('email')} accountId={accountId} />}
    </>

    )
}

export default AuthForm;