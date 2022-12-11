import Button from "../components/button";
import buttonStyles from "../styles/button.module.css";

import { useRouter } from "next/router";

export default function FourOhFour() {
    const router = useRouter();

    return (
        <main>
            <section className="centered flow">
                <h2>404 - Page Not Found</h2>
                <Button
                    onClick={() => router.push({ pathname: "/" })}
                    className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`}
                    buttonText={"Return home"}
                />
            </section>
        </main>
    );
}
