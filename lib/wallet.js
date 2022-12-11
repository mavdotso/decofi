import React, { useEffect, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosOperationType } from "@airgap/beacon-sdk";
import { convertMutez } from "./utils";

export const WalletContext = React.createContext(undefined);

export async function initializeWallet() {
    const Tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
    const beaconWallet = new BeaconWallet({ name: "DeCoFi" });

    Tezos.setWalletProvider(beaconWallet);
}

async function checkIfActiveAccount(wallet) {
    let activeAccount = await wallet.client.getActiveAccount();

    if (!activeAccount) {
        console.log("Not connected");
        return false;
    } else {
        console.log("Connected wallet:", activeAccount.address);
        return activeAccount.address;
    }
}

export async function connectWallet(wallet) {
    await wallet.client.requestPermissions({ network: { type: "mainnet" } });
    const activeAccount = await wallet.client.getActiveAccount();

    console.log("Account already connected:", activeAccount);
    return activeAccount.address;
}

export async function disconnectWallet(wallet) {
    await wallet.clearActiveAccount();

    try {
        const account = await wallet.getPKH();
        console.log("Active Account", account);
    } catch {
        console.log("No wallet connected");
        return false;
    }
}

export async function sendDonation(wallet, to, amount) {
    const donationAmount = convertMutez(amount);

    const fee = (donationAmount / 100) * 5;

    const hash = await wallet.sendOperations([
        {
            kind: TezosOperationType.TRANSACTION,
            destination: to,
            amount: donationAmount - fee,
        },
        {
            kind: TezosOperationType.TRANSACTION,
            destination: "tz1VgoYJYn8WCrzSiJzU8akNexYkZxuZghAH",
            amount: fee,
        },
    ]);

    console.log("Operation Hash: ", hash);
    return hash;
}

export default checkIfActiveAccount;
