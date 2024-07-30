
import styles from './Home.module.css';

const features = () => {
    return (
        <>

            <div className={styles.FeaturesList}>
                <h2>Start Your Journey</h2>
                <p>Journaling is one of the most effective acts of self-care, and you can make it even more powerful with data insights enabled by AI</p>

                <div className={styles.FeatureContainer}>

                    <div className={styles.FeatureItem}>
                        <img src="src\images\goals.svg" alt="achieve goals" />
                        <h3>Achieve Your Goals</h3>
                        <p>Journaling helps you set and track your goals, keeping you accountable and focused. With JournAI, you can analyze your entries to identify patterns and measure your progress. Our AI-powered insights summarize your data, helping you understand your journey and stay motivated to reach your objectives.</p>
                    </div>

                    <div className={styles.FeatureItem}>
                        <img src="src\images\progress.svg" alt="track progress" />
                        <h3>Track Progress and Growth</h3>
                        <p>Regular journaling allows you to revisit previous entries and see how much you've grown. JournAI uses AI to compare your past and present entries, highlighting your progress over time. This helps you understand your journey, celebrate your achievements, and gain a boost in self-confidence.</p>
                    </div>


                    <div className={styles.FeatureItem}>
                        <img src="src\images\stress.svg" alt="reduce streess" />
                        <h3>Reduce Stress and Find Inspiration</h3>
                        <p>Writing down your thoughts can help release negative emotions and reduce stress. JournAI allows you to analyze your entries and identify stress triggers by asking the AI for insights. Additionally, you can uncover inspirational patterns and ideas from your journaling, helping you tap into your creativity and find new sources of inspiration.</p>
                    </div>

                </div>

            </div>

        </>
    )
}

export default features
