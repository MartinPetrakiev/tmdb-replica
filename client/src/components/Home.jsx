import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';
import MovieCard from './MovieCard';
import services from '../shared/services';
import Header from './Header';

function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataTrending = await services.getTrending();
        const dataPopular = await services.getPopular();
        if (dataTrending.ok) {
          const data = await dataTrending.json();
          setTrending((state) => state.concat(data?.results));
        }
        if (dataPopular.ok) {
          const data = await dataPopular.json();
          setPopular((state) => state.concat(data?.results));
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
    fetchData()
  }, []);

  return (
    <div>
      <Header />
      <header className={styles.banner}>
        <div className={styles.content}>
          <h2>Welcome.</h2>
          <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
        </div>
      </header>
      <main>
        <section className={styles.section}>
          <div className={styles.content_wrapper}>
            <div className={styles.row_header}>
              <h2>Trending</h2>
            </div>
            <div className={styles.cards}>
              {trending && trending.length > 0 ?
                trending.map((movie, idx) => (<MovieCard key={movie.id + "_" + idx} data={movie} />))
                :
                (null)
              }
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.content_wrapper}>
            <div className={styles.row_header}>
              <h2>What's Popular</h2>
            </div>
            <div className={styles.cards}>
              {popular && popular.length > 0 ?
                popular.map((movie, idx) => (<MovieCard key={movie.id + "_" + idx} data={movie} />))
                :
                (null)
              }
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
