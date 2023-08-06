import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import {auth} from "../../firebase"
import { signOut } from "firebase/auth";

function Navbar({ name }) {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed Out")
      })
      .catch((error) => {
        // An error happened.
        console.log('Signout Error: ', error);
      });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>Plastic Detection</h1>
      </div>
      {name ? (
        <div className={styles.welcomeContainer}>
          <p>Welcome, {name}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
