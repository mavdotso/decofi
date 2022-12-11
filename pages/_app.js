import "../styles/normalize.css";
import "../styles/index.css";
import Layout from "../components/Layout/layout";

import { useState } from "react";

import { WalletContext, beaconWallet } from "../lib/wallet";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import supabase from "../lib/supabase";

import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
    const [wallet] = useState(beaconWallet);

    return (
        <>
            <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
                <WalletContext.Provider value={wallet}>
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
