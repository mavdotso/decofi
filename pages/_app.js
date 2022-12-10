import "../styles/normalize.css";
import "../styles/index.css";

import Header from "../components/header";
import Footer from "../components/footer";

import { useState } from "react";
import { useRouter } from 'next/router'

import { WalletContext, beaconWallet } from "../lib/wallet";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import supabase from "../lib/supabase";

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [wallet] = useState(beaconWallet);

    return (
        <>
            <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
                <WalletContext.Provider value={wallet}>
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </WalletContext.Provider>
            </SessionContextProvider>
        </>
    );
}

export default MyApp;
