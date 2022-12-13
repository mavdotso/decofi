import Head from "next/head";
import { useState, useEffect } from "react";
import { getUser, updateUserDetails } from "../../lib/supabase";
import { useSession } from "@supabase/auth-helpers-react";

import UserAvatar from "../../components/userAvatar";
import Button from "../../components/button";
import buttonStyles from "../../styles/button.module.css";

export default function Account() {
    const pageTitle = `Your account on DeCoFi`;
    const pageDescription = `Your account on DeCoFi!`;

    const session = useSession();

    const [username, setUsername] = useState();
    const [tezosWallet, setTezosWalletl] = useState();
    const [twitterAccount, setTwitterAccount] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        const checkActiveUser = async () => {
            const user = await getUser(session.user);

            setUsername(user.username);
            setTezosWalletl(user.tezos_wallet);
            setTwitterAccount(user.twitter_account);
            setDescription(user.description);
            setImage(user.image);
        };
        checkActiveUser();
    }, [session]);

    function handleDescription(e) {
        setDescription(e.target.value);
    }
    
    function handleTwitterAccount(e) {
        setTwitterAccount(e.target.value);
    }

    function handletezosWalletAddressChange(e) {
        setTezosWalletl(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        updateUserDetails(session.user.id, tezosWallet, twitterAccount, description)
    }

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta charSet="UTF-8" />
                <meta name="description" content={pageDescription} key="desc" />
                <meta name="og:title" content={pageTitle} />
                <meta name="og:description" content={pageDescription} />
            </Head>
            <main>
                <div className="container">
                    <section className="centered create-account">
                    <UserAvatar className="user-picture" username={username} image={`${username}-${image}`} />
                        <h2>Welcome back, {username}</h2>
                        <p className="sub-heading"></p>
                        <form onSubmit={handleSubmit}>
                            <div className="input-box">
                                Your Tezos wallet:
                                <input
                                    name="tezosWallet"
                                    value={tezosWallet}
                                    placeholder="Your Tezos wallet for donations*"
                                    onChange={handletezosWalletAddressChange}
                                    autoComplete="off"
                                ></input>
                                <span className="input-tip">Not supporting .tez wallets</span>
                            </div>
                            <div className="input-box">
                                Your Description:{" "}
                                <input name="description" value={description} placeholder="Your description" onChange={handleDescription} autoComplete="off"></input>
                            </div>
                            <div className="input-box">
                                Your Twitter handle:
                                <input name="twitterAccount" value={twitterAccount} placeholder="Twitter handle" onChange={handleTwitterAccount} autoComplete="off"></input>
                            </div>
                            <Button className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`} buttonText="Update" />
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
}
