import "../styles/normalize.css";
import "../styles/index.css";
import Layout from "../components/Layout/layout";

import { useState, useEffect } from "react";

import { WalletContext, beaconWallet, Tezos } from "../lib/wallet";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import supabase from "../lib/supabase";

import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
    const [wallet, setWallet] = useState(beaconWallet);

    useEffect(()=>{
        (async () => {
            if (wallet.storage === undefined) {
              const _wallet = new (await import("@taquito/beacon-wallet")).BeaconWallet({ name: "DeCoFi" });
              setWallet(_wallet)
              Tezos.setWalletProvider(_wallet);
            }
          })();
    },[]);

    return (
        <>
            <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
                <WalletContext.Provider value={ wallet }>
                    <AnimatePresence mode="wait" initial={false}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </AnimatePresence>
                </WalletContext.Provider>
            </SessionContextProvider>
        </>
    );
}

export default MyApp;
