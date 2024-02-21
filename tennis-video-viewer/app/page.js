import Link from 'next/link';
import styles from '../../styles/Home.module.css';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>
        <Link href='/upload-video'>Upload a Video</Link>
      </p>
      <p>
        <Link href='/tag-match'>Tag a Match</Link>
      </p>
      
    </div>
  );
}

export default Home;
