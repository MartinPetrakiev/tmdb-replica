import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';
import MovieCard from './MovieCard';
import services from '../shared/services';
import Header from './Header';
import { Button, InputBase, Paper } from '@mui/material';


function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [randBackdrop, setRandBackdrop] = useState('')

  useEffect(() => {
    function genRandBackdrop(listImages) {
      return listImages[Math.floor(Math.random() * listImages.length)]
    }

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
          const listPopularImages = data?.results.slice(10).map(x => x?.backdrop_path)
          setRandBackdrop(genRandBackdrop(listPopularImages))
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
    fetchData()
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.banner} style={{
          backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.8), rgba(1, 180, 228, 0)), url('https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)${randBackdrop}')`
        }}>
          <div className={styles.content}>
            <div className='title'>
              <h2>Welcome.</h2>
              <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
            </div>
            <div className={styles.search}>
              <Paper
                component="form"
                className={styles.submit_search}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  className={styles.input_search}
                  placeholder="Search for a movie, tv show, person......"
                />
                <Button type="button"
                  className={styles.submit_search}>
                  Search
                </Button>
              </Paper>
            </div>
          </div>
        </div>
        <section className={styles.section}>
          <div className={styles.content_wrapper}>
            <div className={styles.row_header}>
              <h2>Trending</h2>
            </div>
            <div className={styles.cards}>
              <div className={styles.cards_content}>
                {trending && trending.length > 0 ?
                  trending.map((movie, idx) => (<MovieCard key={movie.id + "_" + idx} data={movie} />))
                  :
                  (null)
                }
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
                {popular && popular.length > 0 ?
                  popular.map((movie, idx) => (<MovieCard key={movie.id + "_" + idx} data={movie} />))
                  :
                  (null)
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
