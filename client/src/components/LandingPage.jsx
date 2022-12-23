import React, { useState } from 'react'
// import { useNavigate } from "react-router-dom";
import styles from '../styles/LandingPage.module.scss';
import AuthContainer from './AuthContainer'


function LandingPage() {
    const [componentStyles, setComponentStyles] = useState({
        image: {
            flexGrow: 0.7
        },
        hc_container: {
            flexGrow: 0.3,
        }
    });
    const [authShow, setAuthShow] = useState(false);

    const redirectToLogin = (event) => {
        event.preventDefault()
        setComponentStyles({image: { flexGrow: 0 }, hc_container: { flexGrow: 1}})
        setAuthShow(true)
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles['image-container']} style={componentStyles.image} />
            <div className={styles.hc_container} style={componentStyles.hc_container}>
                {authShow
                    ? (<AuthContainer />)
                    : (
                        <div className={styles['welcome-container']}>
                            <h1>TMDB Replica</h1>
                            <p>Find what to watch next among millions of Movies and TV Shows. Enter now.</p>
                            <div className={styles.buttons_container}>
                                <button className={styles.button1} onClick={redirectToLogin}>Explore now</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default LandingPage;