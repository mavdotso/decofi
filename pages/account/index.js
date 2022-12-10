import { useState, useEffect } from "react";
import { getUser, updateUser } from "../../lib/supabase"
import { useSession } from '@supabase/auth-helpers-react'

import Button from "../../components/button";
import buttonStyles from "../../styles/button.module.css";

export default function Account() {

    const session = useSession();

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [tezosWallet, setTezosWalletl] = useState();
    const [twitterAccount, setTwitterAccount] = useState();
    const [description, setDescription] = useState();

    useEffect(()=>{
        const checkActiveUser = async () => {
            const user = await getUser(session.user);

            setUsername(user.username);
            setEmail(user.email);
            setTezosWalletl(user.tezos_wallet);
            setTwitterAccount(user.twitter_account);
            setDescription(user.description);
            console.log("User:", user);
        } 
        checkActiveUser();
    }, [session]);

    return (
        <>      
            <div className="container">
                <section className="centered create-account">
                    <h2>Welcome back, { username }</h2>
                    <p className="sub-heading"></p>
                    <form onSubmit={updateUser}>
                        <div className="input-box">
                            Your Email: <input name="email" value={email} placeholder="Email*" onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="input-box">
                            Your Tezos wallet:
                            <input
                                name="tezosWallet"
                                value={tezosWallet}
                                placeholder="Your Tezos wallet for donations*"
                                onChange={(e) => setTezosWalletl(e.target.value)}
                                autoComplete="off"
                            ></input>
                            <span className="input-tip">Not supporting .tez wallets</span>
                        </div>
                        <div className="input-box">
                            Your Description: <input name="description" value={description} placeholder="Your description" onChange={(e) => setDescription(e.target.value)} autoComplete="off"></input>
                        </div>
                        <div className="input-box">
                            Your Twitter handle:<input name="twitterAccount" value={twitterAccount} placeholder="Twitter handle" onChange={(e) => setTwitterAccount(e.target.value)} autoComplete="off"></input>
                        </div>
                        <Button className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`} buttonText="Update" />
                    </form>
                </section>
            </div>
        </>
    );
}
