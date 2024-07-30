import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.Footer}>
            <div className={styles.FooterContent}>
                <img src="public/images/logo.jpg" alt="Journ AI Logo" className={styles.FooterLogo} />
                <p className={styles.Quote}>Express your thoughts, track your moods, and uncover meaningful insights</p>
            </div>
            <div className={styles.Copyright}>
                <p>&copy; Silvina Figueroa | <a href="https://github.com/SilvinaFigueroa/" target="_blank" rel="noopener noreferrer" className={styles.GitHubLink}>GitHub</a></p>
            </div>
        </footer>
    );
};

export default Footer;