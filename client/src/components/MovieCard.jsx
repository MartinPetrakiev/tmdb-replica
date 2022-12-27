import React, { useState } from 'react';
import styles from '../styles/MovieCard.module.scss';
import { FavoriteRounded, BookmarkRounded } from '@mui/icons-material';
import { Divider, ListItemIcon, Menu, MenuItem, CircularProgress, SvgIcon } from '@mui/material';

function MovieCard({ data }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const releaseDate = new Date(data.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    const openDetails = (e, id) => {
        console.log(id);
    };

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

    return (
        <div className={styles.movie_card}>
            <div className={styles.image_wrapper}>
                <div className={styles.image} onClick={(e) => openDetails(e, data.id)}>
                    <img className={styles.poster} src={'https://image.tmdb.org/t/p/w300' + data.poster_path} alt="Movie" />
                </div>
                <div className={styles.options}>
                    <SvgIcon className={styles.options_icon} id="more_icon" viewBox="0 0 30 30" onClick={handleClick}>
                        <path d="M 16 4 A 12 12 0 1 0 28 16 A 12.0131 12.0131 0 0 0 16 4 Z M 10 18 a 2 2 0 1 1 2 -2 A 2.00006 2.00006 0 0 1 10 18 Z m 6 0 a 2 2 0 1 1 2 -2 A 2.00006 2.00006 0 0 1 16 18 Z m 6 0 a 2 2 0 1 1 2 -2 A 2.00006 2.00006 0 0 1 22 18 Z"/>
                    </SvgIcon>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                bgcolor: '#fff',
                                color: '#303030',
                                mt: 0.5,
                                '& .MuiMenuItem-root': {
                                    padding: '6px 20px',
                                    fontSize: '0.9em'
                                },
                                '& .MuiListItemIcon-root': {
                                    color: '#303030',
                                }
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <FavoriteRounded fontSize="small" />
                            </ListItemIcon>
                            Favorite
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <BookmarkRounded fontSize="small" />
                            </ListItemIcon>
                            Watchlist
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.rating}>
                    <CircularProgress className={styles.track} sx={ratingTrackColor(data.vote_average)} size={35} variant="determinate" value={100} thickness={3} />
                    {data.vote_average ?
                        (<CircularProgress className={styles.progress} sx={ratingProgressColor(data.vote_average)} size={35} variant="determinate" value={Math.floor(data.vote_average) * 10} thickness={3} />)
                        :
                        null
                    }
                    <div className={styles.percent}>{ratingPercent(data.vote_average)}</div>
                </div>
                <h2 onClick={(e) => openDetails(e, data.id)}>{data.title}</h2>
                <p>{releaseDate}</p>
            </div>
        </div>
    );
}

export default MovieCard;
