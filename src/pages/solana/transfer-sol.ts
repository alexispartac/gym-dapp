import {
  Connection,
  LAMPORTS_PER_SOL,
  Transaction,
  PublicKey,
  SystemProgram,
  sendAndConfirmTransaction,
  clusterApiUrl,
  Keypair,
} from "@solana/web3.js";


const sendSol = async(
    connection: Connection,
    senderKeypair: any,
    recipientPubKey: PublicKey,
    amountInLamports: number
): Promise<boolean> => {
    try {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: senderKeypair.publicKey,
                toPubkey: recipientPubKey,
                lamports: amountInLamports,
            })
        );
        
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [senderKeypair],
            { commitment: "confirmed" }
        );
        
        console.log(`✅ Transaction successful! Signature: ${signature}`);
        return true;
    } catch (error) {
        console.error("❌ Error sending SOL:", error);
        return false;
    }
}

const TransferSolana = async ( { senderKeypair, recipientPubKey, amountToSend } : { senderKeypair : Keypair, recipientPubKey: PublicKey, amountToSend: number } ) => {
    console.log("🚀 Starting SOL transfer...");
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");


    const senderBalance = await connection.getBalance(senderKeypair.publicKey)
        .catch( error => console.log(`Error getBalance from ${senderKeypair.publicKey} : ${error}`)).finally();
    if (typeof senderBalance === "number") {
        console.log(`💰 Sender balance: ${senderBalance / LAMPORTS_PER_SOL} SOL`);
    } else {
        console.log("⚠️ Unable to fetch sender balance.");
    }

    if (typeof senderBalance === "number" && senderBalance < amountToSend) {
      console.log("⚠️ Insufficient funds for transaction!");
      return;
    }

    const success = await sendSol(connection, senderKeypair, recipientPubKey, amountToSend);
    if (!success) return;

    console.log(`🎉 Transaction completed successfully! You send ${amountToSend/LAMPORTS_PER_SOL} SOL`);

}

export default TransferSolana;