import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';
import { Header, SearchField, MovieCard } from '../components';

import { useGetTrendingQuery, useGetPopularQuery } from '../shared/moviesApi';

function Home() {
  const { data: trendingList, isFetchingTrending, isErrorTrending, errorTrending } = useGetTrendingQuery();
  const { data: popularList, isFetchingPopular, isErrorPopular, errorPopular } = useGetPopularQuery();
  const [trending, setTrending] = useState('');
  const [popular, setPopular] = useState('');
  const [randBackdrop, setRandBackdrop] = useState('')

  useEffect(() => {
    if (isErrorTrending) {
      console.error(errorTrending)
      setTrending(<div>An error has occurred!</div>);
    } else if (isFetchingTrending) {
      setTrending('Loading...')
    } else {
      setTrending(trendingList?.results.map((movie, idx) => (<MovieCard key={movie.id + "_" + idx} data={movie} />)) || (null))
    }

    if (isErrorPopular) {
      console.error(errorPopular)
      setPopular(<div>An error has occurred!</div>);
    } else if (isFetchingPopular) {
      setPopular('Loading...');
    } else {
      const backdropImage = popularList?.results.slice(10).map(x => x?.backdrop_path)[Math.floor(Math.random() * 10)]
      setRandBackdrop(backdropImage)
      setPopular(popularList?.results.map((movie, idx) => (<MovieCard key={movie.id + "_" + idx} data={movie} />)) || (null));
    }
  }, [trendingList, popularList, errorPopular, errorTrending, isErrorPopular, isErrorTrending, isFetchingPopular, isFetchingTrending]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.banner} style={{
          backgroundImage: popular ? `linear-gradient(to right, rgba(3, 37, 65, 0.8), rgba(1, 180, 228, 0)), url('https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)${randBackdrop}')` : 'linear-gradient(to right, rgba(3, 37, 65, 0.8), rgba(1, 180, 228, 0))'
        }}>
          <div className={styles.content}>
            <div className='title'>
              <h2>Welcome.</h2>
              <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
            </div>
            <SearchField />
          </div>
        </div>
        <section className={styles.section}>
          <div className={styles.content_wrapper}>
            <div className={styles.row_header}>
              <h2>Trending</h2>
            </div>
            <div className={styles.cards}>
              <div className={styles.cards_content}>
                {trending}
              </div>
            </div>
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.content_wrapper}>
            <div className={styles.row_header}>
              <h2>What's Popular</h2>
            </div>
            <div className={styles.cards}>
              <div className={styles.cards_content}>
                {popular}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
