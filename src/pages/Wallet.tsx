// import { Button } from "@mantine/core";
// import React from "react";
// import { PublicKey } from "@solana/web3.js";
// import CheckBalance from "./solana/check-balance";

// const UserPublicKey = "4qRMSiUmyvaWxXsJFUeu7uACa8tkcbpNNhi7bV2H1p3n"

// declare global {
//   interface Window {
//     solana?: {
//       disconnect(): unknown;
//       connect: () => Promise<{ publicKey: { toString: () => string } }>;
//     };
//   }
// }

// const connectWallet = async() => {
//   if (window.solana) {
//     try {
//       const response = await window.solana.connect();
//       console.log("Portofel conectat:", response.publicKey.toString());
//       savePublicKeyToCookie({ publicKey: response.publicKey.toString() });
//       return response.publicKey.toString(); 
//     } catch (err) {
//       console.error("Conectarea la Phantom a eșuat:", err);
//     }
//   } else {
//     alert("Phantom Wallet nu este disponibil. Te rog să îl instalezi.");
//   }
// }

// async function disconnectWallet() {
//   if (window.solana) {
//     try {
//       await window.solana.disconnect();
//       console.log("Portofel deconectat.");
//     } catch (err) {
//       console.error("Deconectarea la Phantom a eșuat:", err);
//     }
//   }
// }

// const savePublicKeyToCookie = ({ publicKey } : { publicKey : string }) => {
//   document.cookie = `publicKey=${publicKey}; path=/; max-age=86400`; 
//   console.log("Cheia publică a fost salvată în cookie.");
// }

// const getPublicKeyFromCookie = () => {
//   const cookies = document.cookie.split("; ");
//   const publicKeyCookie = cookies.find(row => row.startsWith("publicKey="));
//   if (publicKeyCookie) {
//     const publicKey = publicKeyCookie.split("=")[1];
//     console.log("Cheia publică din cookie este:", publicKey);
//     return publicKey;
//   }
//   console.log("Cheia publică nu există în cookie.");
//   return null;
// }

// const deletePublicKeyFromCookie = () => {
//   document.cookie = "publicKey=; path=/; max-age=0";
//   console.log("Cheia publică a fost ștearsă din cookie.");
// }

// const fetchBalance = async ( { publicKey } : { publicKey : string }) => {
//   if (publicKey) {
//     return await CheckBalance({ pubkey: new PublicKey(publicKey) });
//   }
// }

const Wallet = () => {
  // const [publicKey, setPublicKey] = React.useState<string | null>(null);
  // const [balance, setBalance] = React.useState<number | null>(null);
  
  
  // const handleConnectWallet = async () => {
  //   const publicKeyFromCookie = getPublicKeyFromCookie();

  //   if (!publicKeyFromCookie) {
  //     const interval = setTimeout(async () => {
  //       if (!publicKeyFromCookie) {
  //         const publicKey = await connectWallet();
  //         if (!publicKey) {
  //           console.error("Conectarea la portofel a eșuat.");
  //           return;
  //         } else {
  //           setPublicKey(publicKey);
  //           const balance = await fetchBalance({ publicKey });
  //           if (balance) {
  //             setBalance(balance);
  //           } else {
  //             console.error("Obținerea balanței a eșuat.");
  //           }
  //         }
  //       }
  //     }, 2000);
  //     return () => clearInterval(interval);
  //   } else {
  //     setPublicKey(publicKeyFromCookie);
  //     const balance = await fetchBalance({ publicKey: publicKeyFromCookie });
  //     if (balance) {
  //       setBalance(balance);
  //     } else {
  //       console.error("Obținerea balanței a eșuat.");
  //     }
  //   }

  // }

  // const handleDisconectWallet = async () => {
  //   await disconnectWallet();
  //   setPublicKey(null);
  //   setBalance(null);
  // }
  
  return (
    // <div>
    //   {
    //     publicKey ? (
    //       <div>
    //         <h2>Portofel conectat:</h2>
    //         <p>{publicKey}</p>
    //         <Button 
    //           variant="outline"
    //           color="red"
    //           className="flex w-full align-start md:pl-[50px]"
    //           onClick={handleDisconectWallet}
    //         >Deconectează-ți portofelul Phantom</Button>
    //       </div>
    //     ) : (
    //       <div>
    //         <p>Conectează-ți portofelul Phantom pentru a vizualiza adresa.</p>
    //         <Button 
    //           variant="outline"
    //           color="blue"
    //           className="flex w-full align-start md:pl-[50px]"
    //           onClick={handleConnectWallet}
    //         >Conectează-ți portofelul Phantom</Button>
    //       </div>
    //     )
    //   }
    //   {
    //     publicKey && (
    //       <div>
    //         <h2>Balanța portofelului:</h2>
    //         <p>{balance} SOL</p>
    //       </div>
    //     )
    //   }
    // </div>
    <div>
      <h1>Wallet</h1>
      </div>
  )
}

export default Wallet
// export {
//   getPublicKeyFromCookie
// }