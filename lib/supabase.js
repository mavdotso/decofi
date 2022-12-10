import { createClient } from "@supabase/supabase-js";
import { SUPABASE_DB_NAME_DONATIONS } from "./consts";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function submitDonation(from, to, amount, message, transaction_hash) {
    await supabase.from(SUPABASE_DB_NAME_DONATIONS).insert([{ from: from, to: to, amount: amount, message: message, transaction_hash: transaction_hash }]);
}

export async function signUp(email, password, username, tezos_wallet, description, twitter_account, image) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username,
                tezos_wallet: tezos_wallet,
                description: description,
                twitter_account: twitter_account,
                image: image,
            },
        },
    });

    if (error) {
        console.log(error);
    }

    if (data) {
        console.log(data);
    }
}

export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (data) {
        return data;
    }
    if (error) {
        return error;
    }
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log(error);
    }

    console.log("Signed out");

}

export async function getUser() {
    try {
        let { data, error, status } = await supabase.from("users").select().eq("id", user.id).single();

        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}


export async function updateUser(email, password, username, tezos_wallet, description, image) {
    const { data, error } = await supabase.auth.updateUser({
        data: {
            email: email,
            password: password,
            username: username,
            tezos_wallet: tezos_wallet,
            description: description,
            image: image,
        },
    });

    if (data) {
        console.log(data);
    }
    if (error) {
        console.log(error);
    }
}


export default supabase;