import React from 'react'

import styles from './Home.module.css'


const home = () => {
    return (
        <>
            <div className={styles.BannerContainer}>
                <div className={styles.BannerLeftSide}>
                    <h1>Discover How Data and AI Can Help You Know Yourself Better!</h1>
                    <p>Express your thoughts, track your moods, and uncover meaningful insights</p>
                    <button>Join Journ AI Today</button>
                </div>
                <div className={styles.BannerRigthSide}>
                    <img src="src\images\hero-square.svg" alt="hero square image" />
                </div>
            </div>
        </>






    )
}

export default home