import React, { useState, useEffect } from 'react';
import { Header } from '../components';
import { CircularProgress } from '@mui/material';
import { FavoriteRounded, BookmarkRounded, PlayArrow } from '@mui/icons-material';
import styles from '../styles/Details.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useGetDetailsMovieQuery, useGetDetailsTvQuery } from '../shared/moviesApi';
import { averageColorImage } from '../shared/averageColorImage'

function Details() {
  const [avgColor, setAvgColor] = useState(null);
  const [bgPreset, setBgPreset] = useState({
    backgroundColor: '',
    borderBottom: '',
    backgroundImage: ''
  });
  const [backdropColor, setBackdropColor] = useState({
    backgroundImage: ''
  });
  let { media_type, id: media_id } = useParams();
  const { data: movieData, isErrorMovie, errorMovie } = useGetDetailsMovieQuery(media_id, { skip: !media_type || media_type === 'tv' })
  const { data: tvData, isErrorTv, errorTv } = useGetDetailsTvQuery(media_id, { skip: !media_type || media_type === 'movie' })

  useEffect(() => {
    if (avgColor) {
      let rgb = `${avgColor[0]}, ${avgColor[1]}, ${avgColor[2]}`
      const bgPresetImage = () => {
        if (media_type === 'movie') {
          return movieData?.backdrop_path
            ? `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movieData?.backdrop_path})`
            : `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces_filter(blur)${movieData?.poster_path})`
        } else if (media_type === 'tv') {
          return tvData?.backdrop_path
            ? `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${tvData?.backdrop_path})`
            : `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces_filter(blur)${tvData?.poster_path})`
        } else {
          return ''
        }
      }
      setBgPreset(state => {
        return {
          ...state,
          backgroundColor: `linear-gradient(to bottom right, rgba(${rgb}, 1), rgba(${rgb}, 0.84))`,
          borderBottom: `1px solid rgba(${rgb}, 1)`,
          backgroundImage: bgPresetImage()
        }
      })
      setBackdropColor(state => {
        return {
          ...state,
          backgroundImage: `linear-gradient(to right, rgba(${rgb}, 1) calc((50vw - 170px) - 340px), rgba(${rgb}, 0.84) 30%, rgba(${rgb}, 0.84) 100%)`
        }
      })
    }
  }, [avgColor, movieData, tvData, media_type]);

  function ratingTrackColor(rating) {
    if (!rating) {
      return { color: '#666666' };
    }
    if (rating < 7) {
      return { color: '#423d0f' };
    } else {
      return { color: '#204529' };
    }
  }

  function ratingProgressColor(rating) {
    if (rating < 7) {
      return { color: '#d2d531' };
    } else {
      return { color: '#21d07a' };
    }
  }

  function ratingPercent(rating) {
    if (!rating) {
      return 'NR';
    } else {
      const percent = Math.floor(rating) * 10;
      return (<>{percent}<span>%</span></>);
    }
  }

  if (isErrorMovie) {
    console.log(errorMovie)
    return <div>Error</div>
  } else if (isErrorTv) {
    console.log(errorTv)
    return <div>Error</div>
  } else if (movieData || tvData) {
    return (
      <>
        <Header />
        <section className={styles.main}>
          <div className={styles.main_info} style={bgPreset}>
            <div className={styles.backdrop_container} style={backdropColor}>
              <div className={styles.single_column}>
                <section className={styles.images_info}>
                  <div className={styles.poster_wrapper}>
                    <div className={styles.poster}>
                      <img onLoad={(e) => setAvgColor(averageColorImage(e))} src={`https://image.tmdb.org/t/p/w300${movieData?.poster_path || tvData?.poster_path}`} alt='poster_image' />
                    </div>
                  </div>

                  <div className={styles.description_wrapper}>
                    <section className={styles.description_container}>
                      <div className={styles.title}>
                        <h2>
                          <span className={styles.media_title}>{(media_type === 'movie') ? movieData.title : tvData.name}</span>
                          <span>(2022)</span>
                        </h2>
                        <div className={styles.facts}>
                          <span className={styles.certification}>
                            TV-14
                          </span>
                          <span className={styles.fact}>
                            12/01/2023
                          </span>
                          <span className={styles.fact}>
                            <a href="/genre/10765-sci-fi-fantasy/tv">Sci-Fi &amp; Fantasy</a>,&nbsp;<a href="/genre/9648-mystery/tv">Mystery</a>,&nbsp;<a href="/genre/35-comedy/tv">Comedy</a>
                          </span>
                          <span className={styles.fact}>
                            runtime
                          </span>
                        </div>
                      </div>

                      <ul className={styles.actions}>
                        <li className={styles.chart}>
                          <div className={styles.outer_ring}>
                            <div className={styles.user_score_chart}>
                              <CircularProgress className={styles.track} sx={ratingTrackColor(8.7)} size={68} variant="determinate" value={100} thickness={3} />
                              <CircularProgress className={styles.progress} sx={ratingProgressColor(8.7)} size={68} variant="determinate" value={Math.floor(8.7) * 10} thickness={3} />
                              <div className={styles.percent}>{ratingPercent(8.7)}</div>
                            </div>
                          </div>
                          <div className={styles.text}>User<br />Score</div>
                        </li>

                        <li className="styles.tooltip use_tooltip" title="Mark as favorite">
                          <div className={styles.icon_round}><span className={styles.icon_action}><FavoriteRounded /></span></div>
                        </li>
                        <li className="styles.tooltip use_tooltip" title="Add to your watchlist">
                          <div className={styles.icon_round}><span className={styles.icon_action}><BookmarkRounded /></span></div>
                        </li>

                        <li className={styles.video}>
                          <span className={styles.icon_play}><PlayArrow /></span>
                          <div className={styles.text}>Play Trailer</div>
                        </li>
                      </ul>

                      <div className={styles.coontainer_info}>
                        <h3 className={styles.tagline}>Something</h3>
                        <h3>Overview</h3>
                        <div className={styles.overview}>
                          <p>Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers, stop a monstrous killing spree of the town citizens, and solve the supernatural mystery that affected her family 25 years ago — all while navigating her new relationships.</p>
                        </div>

                        <ul className={styles.people}>
                          <li className={styles.profile}>
                            <p><Link to="/person/18923-miles-millar">Miles Millar</Link></p>
                            <p className={styles.character}>Creator</p>
                          </li>
                          <li className={styles.profile}>
                            <p><Link to="/person/18924-alfred-gough">Alfred Gough</Link></p>
                            <p className={styles.character}>Creator</p>
                          </li>
                        </ul>
                      </div>
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return null;
}

export default Details