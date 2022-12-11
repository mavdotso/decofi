import Button from "../components/button";
import DonateBox from "../components/donateBox";

import buttonStyles from "../styles/button.module.css";

import convertToSlug from "../lib/utils";

import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    const [newUsername, setNewUsername] = useState("");

    function handleChange(e) {
        setNewUsername(convertToSlug(e.target.value));
    }

    function createAccount(e) {
        e.preventDefault();
        router.push({ pathname: "/sign-up", query: { username: newUsername } }, { as: "/sign-up" });
    }

    return (
        <main>
            <section className="container flow section-hero centered">
                <h1>
                    Buy me a coffee on blockchain <sup className="tezos_sign">ꜩ</sup>{" "}
                </h1>
                <p className="sub-heading">Receive tips and donations from your fans and followers direclty to your web3 wallet.</p>

                <form className="claim-username-form">
                    <div className="input-box">
                        <span>decofi.xyz/</span>
                        <input name="newUsername" value={newUsername} onChange={handleChange} placeholder="your-username"></input>
                    </div>
                    <div>
                        <Button
                            className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`}
                            buttonText="Claim Your Username!"
                            onClick={createAccount}
                        />
                        <p className="under-cta-text">It's free, and takes less than a minute.</p>
                    </div>
                </form>
            </section>

            <section className="container section-cards">
                <div className="card">
                    <h3>Private</h3>
                    <p>Your supporters don't have to create an account or go through a verification process.</p>

                    <div className="example-donation">
                        <p>
                            ☕️ <span className="example-bold">tz1gRm...wu2</span> bought <span className="example-bold">5</span> coffees
                        </p>
                    </div>

                    <div className="example-donation">
                        <p>
                            ☕️ <span className="example-bold">tz1gRm...wu2</span> bought <span className="example-bold">3</span> coffees
                        </p>
                    </div>

                    <div className="example-donation">
                        <p>
                            ☕️ <span className="example-bold">tz1gRm...wu2</span> bought <span className="example-bold">1</span> coffee
                        </p>
                    </div>
                </div>
                <div className="card">
                    <h3>Direct</h3>
                    <p>Instant payouts to your web3 wallet. No transaction authorisation or funds clearance.</p>
                </div>
                <div className="card">
                    <h3>Fair</h3>
                    <p>You keep 95% of your earnings — DeCoFi only takes a 5% fee on every transaction.</p>
                </div>
            </section>

            <div className="full-width">
                <section className="container flow even-columns">
                    <div className="content">
                        <h2>Simple</h2>
                        <p className="sub-heading">
                            Make supporting you quick and easy. <br />
                            <br />
                            Setup your account, connect your wallet and begin getting payouts in less than 3 minutes.
                        </p>
                    </div>
                    <DonateBox username="mav" id="1637b044-e667-43b7-9c1d-558bc7b5a448" tezosWalletAddress="tz1VgoYJYn8WCrzSiJzU8akNexYkZxuZghAH" image="mav-mav.jpeg" />
                </section>
            </div>
        </main>
    );
}
