import Link from 'next/link';
import SearchDropdown from '../components/SearchDropdown';
import Dashboard from '../(interactive)/dashboard/dash.js';

import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    /*
    <div className={styles.container}>
      <h1 className={styles.title}>
      Match Viewer
      </h1>
      <div className="searchDropdown">
        <SearchDropdown/>
      </div>

      <div className={styles.actionsContainer}>
        <p>Or get started by:</p>
        <ul>
          <li>
            <Link href="/upload-match">Uploading a match</Link>
          </li>
          <li>
            <Link href="/upload-team">Adding a Team</Link>
          </li>
          <li>
            <Link href="/tag-match">Tagging a match</Link>
          </li>
        </ul>
      </div>
    </div>*/
    <Dashboard/>
  );
}

export default Home;
