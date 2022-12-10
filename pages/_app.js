import "../styles/normalize.css";
import "../styles/index.css";

import Header from "../components/header";
import Footer from "../components/footer";

import { useState } from "react"


import { WalletContext, beaconWallet } from "../lib/wallet";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'


function MyApp({ Component, pageProps }) {
    const [wallet] = useState(beaconWallet);
    const [supabase] = useState(() => createBrowserSupabaseClient())

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
