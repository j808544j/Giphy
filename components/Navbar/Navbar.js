import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <h1 className={styles.logo}>XeroCodee</h1>
      <div className={styles.subContainer}>
        <ul className={styles.navLinks}>
          <li>
            <Link className={styles.navLink} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/features">
              Features
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/pages">
              Pages
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/contact">
              Contact
            </Link>
          </li>
        </ul>
        <button className={styles.signInButton}>Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
