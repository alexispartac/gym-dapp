import { Button, Stack } from "@mantine/core";
import { motion } from "framer-motion";
import { modals } from "@mantine/modals";
import React from "react";
import { useUser } from "../../context/UserContext";

const connectWallet = async ({ setUser }: { setUser : React.Dispatch<React.SetStateAction<{ userInfo: { userId: string; username: string; publicKey: string; password: string; }; isAuthenticated: boolean; }>> }) => {

    if ("solana" in window) {
        const provider = (window as any).solana;
        console.log(provider);
        if (provider.isPhantom) {
            try {
                const response = await provider.connect();
                setUser((prevUser: any) => ({ ...prevUser, isAuthenticated: true }));
                modals.closeAll();
                console.log("Wallet connected with public key:", response.publicKey.toString());
            } catch (err) {
                console.error("Error connecting wallet:", err);
            }
        } else {
            console.error("Phantom Wallet not found");
        }
    } else {
        console.error("Solana object not found in window");
        modals.openConfirmModal({
            title: "Phantom Wallet Not Found",
            centered: true,
            children: (
                <p className="text-white">
                    Phantom Wallet extension not found. Please install it from the Phantom Wallet store.
                </p>
            ),
            classNames: {
                content: "bg-neutral-800 text-white",
                header: "bg-neutral-800 text-white",
                title: "text-white",
                close: "text-white bg-neutral-800 hover:bg-neutral-700",
            },
            labels: { confirm: "OK", cancel: "Cancel" },
            onCancel: () => {},
            onConfirm: () => {},
        });
    }
};

const Authentication = () => {
    const { setUser } = useUser();

    const showConnectWalletModal = () => {
        modals.openConfirmModal({
            title: "Connect Phantom Wallet",
            centered: true,
            children: (
                <p className="text-white">
                    You need to connect your Phantom Wallet to continue. Please click the button below to connect.
                </p>
            ),
            classNames: {
                content: "bg-neutral-800 text-white",
                header: "bg-neutral-800 text-white",
                title: "text-white",
                close: "text-white bg-neutral-800 hover:bg-neutral-700",
            },
            withCloseButton: true,
            closeOnCancel: false,
            closeOnClickOutside: false,
            labels: { confirm: "Connect Wallet", cancel: "Cancel" },
            onConfirm: () => {
                connectWallet( { setUser } ).then(() => {
                    console.log("Wallet connected successfully");
                }).catch((err) => { 
                    console.error("Error connecting wallet:", err);
                });
            },
        });
    };

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
                                showConnectWalletModal();
                            }}
                        >
                            Be a GymBro
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
