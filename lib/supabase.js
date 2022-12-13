import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_DB_NAME_DONATIONS, SUPABASE_DB_NAME_USERS } from "./consts";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function submitDonation(from, to, amount, message, transaction_hash) {
    const { data, error } = await supabase.from(SUPABASE_DB_NAME_DONATIONS).insert([{ from: from, to: to, amount: amount, message: message, transaction_hash: transaction_hash }]);

    if (error) {
        console.log(error);
    }
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
        console.log("Error signing up: ", error);
        return error;
    }

    if (data) {
        return data;
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
        console.log("Error signing in: ", error);
        return error;
    }
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log("Error signing out: ", error);
    }
}

export async function resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: "/account/password-reset/" });

    if (data) {
        return data;
    }

    if (error) {
        console.log(error);
        return error;
    }
}

export async function setNewPassword(password) {
    const { data, error } = await supabase.auth.updateUser({ password: password });

    if (data) console.log("Password updated successfully!");
    if (error) console.log("There was an error updating your password.");
}

export async function getUser(user) {
    try {
        let { data, error, status } = await supabase.from(SUPABASE_DB_NAME_USERS).select().eq("id", user.id).single();

        if (error && status !== 406) {
            console.log(error);
        }

        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function updateUser(email, password) {
    const { data, error } = await supabase.auth.updateUser({
        email: email,
        password: password,
    });

    if (data) {
        console.log(data);
    }
    if (error) {
        console.log(error);
    }
}

export async function updateUserDetails(id, username, tezosWallet, twitterAccount, image) {
    // id should match the user id
    const { data, error } = await supabase
    .from(SUPABASE_DB_NAME_USERS)
    .update(
        { 
            username: username,
            tezos_wallet: tezosWallet,
            twitter_account: twitterAccount,
            image: image
         }
        )
    .eq('id', id)

}

export default supabase;
