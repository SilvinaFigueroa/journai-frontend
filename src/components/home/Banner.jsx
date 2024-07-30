import { Link } from 'react-router-dom'

import styles from './Home.module.css'


const home = () => {
    return (
        <>
            <div className={styles.BannerContainer}>
                <div className={styles.BannerLeftSide}>
                    <h1>Discover How Data and AI Can Help You Know Yourself Better!</h1>
                    <p>Express your thoughts, track your moods, and uncover meaningful insights</p>
                    <Link to="/signup" className={styles.Bannerbutton}>Join Journ AI Today</Link>

                </div>
                <div className={styles.BannerRigthSide}>
                    <img src="public\images\hero-square.svg" alt="hero square image" />
                </div>
            </div>
        </>






    )
}

export default home