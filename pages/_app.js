import "../styles/normalize.css";
import "../styles/index.css";

import Header from "../components/header";
import Footer from "../components/footer";

import { useState } from "react";
import { useRouter } from "next/router";

import { WalletContext, beaconWallet } from "../lib/wallet";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import supabase from "../lib/supabase";
import { useEffect } from "react";

import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
    const [wallet] = useState(beaconWallet);

    const router = useRouter();

    return (
        <>
            <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
                <WalletContext.Provider value={wallet}>
                    <AnimatePresence mode="wait" initial={false}>
                        <Header />
                        <Component {...pageProps} />
                        <Footer />
                    </AnimatePresence>
                </WalletContext.Provider>
            </SessionContextProvider>
        </>
    );
}

export default MyApp;
