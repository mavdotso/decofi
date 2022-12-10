import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import Button from "../../components/button";
import buttonStyles from "../../styles/button.module.css";

export default function Account({ session }) {
    const supabase = useSupabaseClient();
    const user = useUser();

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [tezosWallet, setTezosWalletl] = useState(null);
    const [twitterAccount, setTwitterAccount] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);

            let { data, error, status } = await supabase.from("users").select().eq("id", user.id).single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
                setEmail(data.email);
                setTezosWalletl(data.tezos_wallet);
                setTwitterAccount(data.twitter_account);
                setDescription(data.description);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({ username, email, tezosWallet, twitterAccount, description }) {
        try {
            setLoading(true);

            const updates = {
                id: user.id,
                username,
                email,
                tezosWallet,
                twitterAccount,
                description,
                updated_at: new Date().toISOString(),
            };

            let { error } = await supabase.from("profiles").upsert(updates);
            if (error) throw error;
            alert("Profile updated!");
        } catch (error) {
            alert("Error updating the data!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? (
                ""
            ) : (
                <div className="container">
                    <section className="centered create-account">
                        <h2>Welcome back, {username}</h2>
                        <p className="sub-heading"></p>
                        <form onSubmit={updateProfile}>
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
            )}
        </>
    );
}
