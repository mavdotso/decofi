import Activity from "../components/activity";
import DonateBox from "../components/donateBox";
import UserAvatar from "../components/userAvatar";
import Layout from "../components/Layout/layout";

import supabase from "../lib/supabase.js";
import { SUPABASE_DB_NAME_USERS } from "../lib/consts";

export default function User({ user }) {
    return (
        <Layout>
            <div className="full-width">
                <section className="container flow user-info">
                    <div className="user-picture-holder">
                        <UserAvatar className="user-picture" username={user.username} image={`${user.username}-${user.image}`} />
                    </div>
                    <div className="user-description">
                        <h1>{user.username}</h1>
                        <p>{user.description}</p>
                    </div>
                </section>
            </div>

            <section className="container even-columns">
                <Activity id={user.id} />
                <DonateBox username={user.username} id={user.id} tezosWalletAddress={user.tezos_wallet} image={`${user.username}-${user.image}`} />
            </section>
        </Layout>
    );
}

export async function getStaticPaths() {
    const { data, error } = await supabase.from(SUPABASE_DB_NAME_USERS).select("*");
    const paths = data.map((user) => {
        return {
            params: { username: user.username.toString() },
        };
    });

    return {
        paths: paths,
        fallback: false,
    };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
    const { params } = context;
    const { data, error } = await supabase.from(SUPABASE_DB_NAME_USERS).select().eq("username", params.username).single();

    return {
        props: { user: data },
    };
}
