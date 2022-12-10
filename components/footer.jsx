import Link from "next/link";
import Logo from "./logo";
import { FaTwitter } from "react-icons/fa";
import styles from "../styles/footer.module.css"

export default function Footer() {
    return (
        <footer className={ styles.footer }>
            <Link className={ styles.logo } href="/">
                {<Logo />}
            </Link>
            <p>© DeCoFi — Make supporting you quick and easy.</p>
            <a href="https://twitter.com/0xMav" className={ styles.footer_icon }>
                {<FaTwitter />}
            </a>
        </footer>
    );
}
