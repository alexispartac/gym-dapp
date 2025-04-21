import { Button, Stack } from "@mantine/core";
import { motion } from "framer-motion";
import { modals } from "@mantine/modals";

const Authentication = () => {
    return (
        <main
            className="relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900"
        >

            <div
                className="absolute inset-0 overflow-hidden"
                style={{
                    backgroundImage:
                    "repeating-linear-gradient(100deg, #3b3c91 10%, #2c2f7a 20%, #006a6e 30%, #1a4a7a 40%, #3b3c91 50%)",
                    backgroundSize: "300% 300%",
                    animation: "gradient-animation 4s ease infinite",
                }}
            ></div>


            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
                <Stack py={"17rem"}>
                    <h1 className="flex text-7xl m-auto mb-[10px] text-white"> GymBro </h1>
                    <Button
                        variant="outline"
                        color="white"
                        className="w-[70%] m-auto"
                        onClick={() => {
                            modals.openContextModal({
                                modal: "login",
                                title: "LogIn",
                                innerProps: undefined,
                                centered: true,
                                padding: "xl",
                                classNames: {
                                    content: "bg-neutral-800 text-white",
                                    header: "bg-neutral-800 text-white",
                                    title: "text-white",
                                    close: "text-white bg-neutral-800 hover:bg-neutral-700",
                                },

                            });
                        }}
                    >
                        LogIn and be ready
                    </Button>
                </Stack>
            </motion.div>

            <style>
                {`
          @keyframes gradient-animation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
            </style>
        </main>
    );
};

export default Authentication;