import Logo from "./logo";
import Button from "./button";
import styles from "../styles/header.module.css";
import buttonStyles from "../styles/button.module.css";

import { useState, useEffect, useContext } from "react";
import checkIfActiveAccount, { connectWallet, disconnectWallet, WalletContext } from "../lib/wallet";
import { useSession } from '@supabase/auth-helpers-react'
import { signOut } from "../lib/supabase"

import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
    const wallet = useContext(WalletContext);
    const session = useSession();
    const router = useRouter();

    const [isActiveWallet, setActiveWallet] = useState();

    useEffect(() => {
        if(wallet !== undefined) {
            const checkActiveAccount = async () => {
                const account = await checkIfActiveAccount(wallet);
                setActiveWallet(account);
            };
        checkActiveAccount();
        }
    }, [wallet]);

    async function handleSync(e) {
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

    async function handleSignOut() {
        signOut();
        router.push({ pathname: "/" });
    }

    return (
        <header>
            <div className={styles.menu}>
                <Link href="/">
                    <Logo className={styles.logo} />
                </Link>
                <div className={styles.menu_buttons}>
                    {session ? (
                        <>
                            <Link className={styles.menu_item} href="/account">
                                Account
                            </Link>
                            <Link className={styles.menu_item} href="" onClick={ handleSignOut }>
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
                    {isActiveWallet ? (
                        <Button
                            onClick={handleSync}
                            className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_small}`}
                            buttonText={"Unsync"}
                        />
                    ) : (
                        <Button
                            onClick={handleSync}
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
