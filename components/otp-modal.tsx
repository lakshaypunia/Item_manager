"use client"
import React, { useState } from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
// import { sendEmailOTP, verfiySecret } from "@/lib/actions/user.actions"
import { useRouter } from "next/navigation"
import { verfiySecret } from "@/lib/useractions/action"


const OtpModal = ({email, accountId} :{ email : string;  accountId : string}) => {

    const router = useRouter();
    const [password,setpassword] = useState("")
    const[isOpen,  setIsOpen] = useState(true)
    const[isloading, setisloading] = useState(false)

    const handleSubmit = async(e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setisloading(true);

        try{
            const sessionId = await verfiySecret({accountId,password})
            if(sessionId){
                router.push("/")
            }

        }catch(error){
            console.log("Failed to verify Otp", error)
        }finally{
            setisloading(false)
        }

    };

    const handleResendOtp = async() => {
        // await sendEmailOTP(email) 
    }


    return (
        <div>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="space-y-4 max-w-[95%] sm:w-fit rounded-xl md:rounded-[30px] px-4 md:px-8 py-10 bg-white outline-none">
                <AlertDialogHeader className="relative flex justify-center">
                <AlertDialogTitle className="text-[24px] leading-[36px] font-bold text-center">
                    Enter Your OTP
                    <Image src="/assets/icons/close-dark.svg"
                    alt="close"
                    width={20}
                    height={20}
                    onClick={() => {
                        setIsOpen(false)
                    }}
                    className="otp-close-button"
                    />

                    </AlertDialogTitle>
                <AlertDialogDescription className="text-[14px] leading-[20px] font-semibold text-center text-light-100">
                    verify yourself
                    we've send a code to <span className="pl-1 text-brand">{email}</span>
                    enter the code to setp up your email as the enquiry email to test the enquiry feature. after succesfull verification you will be redirected to the home page.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <InputOTP
                        maxLength={6}
                        value={password}
                        onChange={setpassword}
                    >
                        <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                <AlertDialogFooter>
                    <div className="flex w-full flex-col gap-4 ">
                        <AlertDialogAction onClick={handleSubmit} className="shad-submit-btn h-12 " type="button">
                            Submit
                            {isloading && <Image
                                src="/assets/icons/loader.svg"
                                alt="loader"
                                width={24}
                                height={24}
                                className="ml-2 animate-spin"
                                />}
                            </AlertDialogAction>

                            <div className="text-[14px] leading-[20px] font-semibold mt-2 text-center text-light-100">
                                Didn't get a code?
                                <Button type="button" variant="link" className="pl-1 text-white bg-black" onClick={handleResendOtp}>Click to resend</Button>
                            </div>

                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        </div>
        )
}

export default OtpModal