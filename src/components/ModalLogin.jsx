import React, { useState } from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { MailIcon } from "./Icons/MailIcon";
import { LockIcon } from "./Icons/LockIcon";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ModalLogin({ setUserInfo }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter()

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.post(`/api/login`, loginData)
            // setErrorMessage("Success")
            localStorage.setItem("userInfo", JSON.stringify(data.data))
            setUserInfo(data.data)
            router.push("/dashboard")
            //close modal
            onOpenChange(false)
            // console.log(data)
            setIsLoading(false)
        } catch (error) {
            // console.log(error)
            setErrorMessage(error.response.data.message)
            setIsLoading(false)
        }
    }


    return (
        <>
            <Button onPress={onOpen} color="primary">Sign In</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Sign in</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    endContent={
                                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Username"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                    onChange={
                                        (e) => {
                                            setErrorMessage("")
                                            setLoginData({ ...loginData, username: e.target.value })
                                        }
                                    }
                                />
                                <Input
                                    endContent={
                                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    variant="bordered"
                                    onChange={
                                        (e) => {
                                            setErrorMessage("")
                                            setLoginData({ ...loginData, password: e.target.value })
                                        }
                                    }
                                />
                                <div className="flex py-2 px-1 justify-between">
                                    <Checkbox
                                        classNames={{
                                            label: "text-small",
                                        }}
                                    >
                                        Remember me
                                    </Checkbox>
                                    <Link color="primary" href="#" size="sm">
                                        Forgot password?
                                    </Link>
                                </div>
                                <span className="text-red-500 text-center">
                                    {errorMessage}
                                </span>
                            </ModalBody>
                            <ModalFooter className="flex flex-col items-center">
                                <div className="flex w-full gap-3 justify-end">
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={handleLogin}>
                                        {isLoading ? <>   <Spinner color="default" /></> : <>   Sign in</>}
                                    </Button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
