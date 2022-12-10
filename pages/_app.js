import "../styles/normalize.css";
import "../styles/index.css";

import Header from "../components/header";
import Footer from "../components/footer";

import { WalletContext, beaconWallet } from "../lib/wallet";
import { useState } from "react"


function MyApp({ Component, pageProps }) {
    const [wallet] = useState(beaconWallet);

    return (
        <>
          <WalletContext.Provider value={wallet}>
            <Header />
              <Component {...pageProps} />
            <Footer />
          </WalletContext.Provider>
        </>
    );
}

export default MyApp;
