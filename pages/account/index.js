import Head from "next/head";
import { useState, useEffect } from "react";
import { getUser, signOut } from "../../lib/supabase";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Activity from "../../components/activity";
import Link from "next/link";

import UserAvatar from "../../components/userAvatar";
import Button from "../../components/button";
import buttonStyles from "../../styles/button.module.css";

export default function Account() {
    const pageTitle = `Your account on DeCoFi`;
    const pageDescription = `Your account on DeCoFi!`;

    const session = useSession();
    const router = useRouter();

    const [username, setUsername] = useState();
    const [userID, setUserID] = useState();
    const [imageURL, setImageURL] = useState();

    useEffect(() => {
        const checkActiveUser = async () => {
            if (session === undefined || session === null) {
                signOut();
                router.push({ pathname: "/sign-in" });
            } else {
                const user = await getUser(session.user);
                if (user) {
                    setUsername(user.username);
                    setUserID(user.id);
                    setImageURL(user.imageURL);
                } else {
                    signOut();
                    router.push({ pathname: "/sign-in" });
                }
            }
        };
        checkActiveUser();
    }, [session]);

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
                        <UserAvatar className="user-picture" username={username} imageURL={imageURL} />
                        <h2>Welcome back, {username}!</h2>
                        <Link className="sub-heading" href="/account/edit-account">Edit account details</Link>
                        <Activity id={userID} />
                    </section>
                </div>
            </main>
        </>
    );
}
