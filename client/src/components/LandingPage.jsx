import React from 'react'
import { useNavigate } from "react-router-dom";
import styles from '../styles/LandingPage.module.scss';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.heading_card_wrapper}>
                <div className={styles.hc_container}>
                    <h1>TMDB Replica</h1>
                    <p>Find what to watch next among millions of Movies and TV Shows. Enter now.</p>
                    <div className={styles.buttons_container}>
                        <button onClick={() => navigate('/auth', { tabValue: 0 })} className={styles.button1}>LOGIN</button>
                        <button onClick={() => navigate('/auth', { tabValue: 1 })} className={styles.button2}>REGISTER</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;