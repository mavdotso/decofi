import "../styles/normalize.css";
import "../styles/index.css";

import Layout from "../components/Layout/layout";

import { useState, useEffect } from "react";

import { WalletContext, initializeWallet } from "../lib/wallet";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import supabase from "../lib/supabase";

import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
    const [wallet, setWallet] = useState();

    useEffect(()=>{
        const func = async () => {
            const _wallet = await initializeWallet();
            setWallet(_wallet);
        }
        func();
    }, []);

    return (
        <>
            <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
                <WalletContext.Provider value={ wallet }>
                    <AnimatePresence mode="wait">
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
