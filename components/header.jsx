import Logo from "./logo";
import Button from "./button";
import styles from "../styles/header.module.css";
import buttonStyles from "../styles/button.module.css";

import { useState, useEffect, useContext } from "react";
import checkIfActiveAccount, { connectWallet, disconnectWallet, WalletContext } from "../lib/wallet";
import { getUser, signOut } from "../lib/supabase";

import Link from "next/link";

function Header({ session }) {
    const wallet = useContext(WalletContext);

    const [isActiveWallet, setActiveWallet] = useState();
    const [isActiveUser, setActiveUser] = useState(false);

    useEffect(() => {
        const checkActiveAccount = async () => {
            const account = await checkIfActiveAccount(wallet);
            setActiveWallet(account);
        };
        checkActiveAccount();
    }, [wallet]);

    useEffect(() => {
        const checkIfActiveUser = async () => {
            const user = await getUser();

            if(user) {
                setActiveUser(true);
                console.log("User:", user);
            } 
        };
        checkIfActiveUser();
    }, [session]);

    console.log("Session", session);

    async function handleClick(e) {
        e.preventDefault();

        const account = await checkIfActiveAccount(wallet);

        if (account) {
            disconnectWallet(wallet);
            setActiveWallet(false);
        } else {
            const isConnected = await connectWallet(wallet);

            if (isConnected) {
                setActiveWallet(true);
            }
        }
    }

    return (
        <header>
            <div className={styles.menu}>
                <Link href="/">
                    <Logo className={styles.logo} />
                </Link>
                <div className={styles.menu_buttons}>
                    {isActiveUser ? (
                        <>
                            <Link className={styles.menu_item} href="/account">
                                Account
                            </Link>
                            <Link className={styles.menu_item} href="" onClick={signOut}>
                                Sign out
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link className={styles.menu_item} href="/sign-in">
                                Sign in
                            </Link>
                            <Link className={styles.menu_item} href={{ pathname: "/sign-up", query: { username: "" } }} as="/sign-up">
                                Sign up
                            </Link>
                        </>
                    )}
                    ;
                    {isActiveWallet ? (
                        <Button
                            onClick={handleClick}
                            className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_small}`}
                            buttonText={"Unsync"}
                        />
                    ) : (
                        <Button
                            onClick={handleClick}
                            className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_small}`}
                            buttonText={"Sync"}
                        />
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;