import Link from 'next/link';

import SearchDropdown from '../components/SearchDropdown';

import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
      Match Viewer
      </h1>

      {/* Search Dropdown */}
      <div className="searchDropdown">
        <SearchDropdown/>
      </div>

      {/* Other Links */}
      <div className={styles.actionsContainer}>
        <p>Or get started by:</p>
        <ul>
          <li>
            <Link href="/upload-video">Uploading a video</Link>
          </li>
          <li>
            <Link href="/tag-match">Tagging a match</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
