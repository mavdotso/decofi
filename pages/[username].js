import Head from "next/head";
import Activity from "../components/activity";
import DonateBox from "../components/donateBox";
import UserAvatar from "../components/userAvatar";
import Link from "next/link";

import supabase from "../lib/supabase.js";
import { SUPABASE_DB_NAME_USERS } from "../lib/consts";

export default function User({ user }) {
    const pageTitle = `${user.username} on DeCoFi`;
    const pageDescription = `Support ${user.username} on DeCoFi!`;

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
                <div className="full-width">
                    <section className="container flow user-info">
                        <div className="user-picture-holder">
                            <UserAvatar className="user-picture" username={user.username} imageURL={user.imageURL} />
                        </div>
                        <div className="user-description">
                            <h1>{user.username}</h1>
                            <p>{user.description}</p>
                        </div>
                    </section>
                </div>

                <section className="container even-columns">
                    <Activity id={user.id} />
                    <DonateBox username={user.username} id={user.id} tezosWalletAddress={user.tezos_wallet} imageURL={user.imageURL} />
                </section>
            </main>
        </>
    );
}

export async function getStaticPaths() {
    const { data, error } = await supabase.from(SUPABASE_DB_NAME_USERS).select("*");
    const paths = data.map((user) => {
        return {
            params: { username: user.username.toString() }
        };
    });

    return {
        paths: paths,
        fallback: false,
        revalidate: 1
    };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
    const { params } = context;
    const { data, error } = await supabase.from(SUPABASE_DB_NAME_USERS).select().eq("username", params.username).single();

    return {
        props: { user: data },
        revalidate: 1
    };
}
