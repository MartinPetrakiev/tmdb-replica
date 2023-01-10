import React, { useEffect, useState } from 'react';
import styles from '../styles/SearchField.module.scss';
import { Button, Paper, TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useGetSearchDataQuery } from '../shared/moviesApi';
import moviePlaceholder from '../styles/assets/movie_placeholder.png';
import tvPlaceholder from '../styles/assets/television.png';
import avatarPlaceholder from '../styles/assets/avatar.png';
import { createSearchParams, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const filter = createFilterOptions();

function SearchField() {
    const [value, setValue] = useState('');
    const { data: searchData, isError, error } = useGetSearchDataQuery(value, { skip: !!value ? false : true })
    const [searchValue, setSearchValue] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            console.error(error)
        } else {
            const searchList = searchData?.results
                .map((result) => {
                    let image, title, year;
                    year = new Date(result.release_date).getFullYear();
                    if (result.media_type === 'movie') {
                        image = result.poster_path ? `https://image.tmdb.org/t/p/w300${result.poster_path}` : moviePlaceholder;
                        title = result.title;
                    } else if (result.media_type === 'tv') {
                        image = result.poster_path ? `https://image.tmdb.org/t/p/w300${result.poster_path}` : tvPlaceholder;
                        title = result.name;
                    } else {
                        image = result.profile_path ? `https://image.tmdb.org/t/p/w300${result.profile_path}` : avatarPlaceholder;
                        title = result.name;
                    }
                    return ({
                        type: result.media_type,
                        id: result.id,
                        image: image,
                        title: title,
                        year: year || ''
                    })
                })
            setSearchValue(searchList)
        }
    }, [isError, searchData, error]);

    return (
        <div className={styles.search}>
            <Paper
                component="form"
                className={styles.submit_search}
            >
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setValue(newValue);
                        } else if (typeof newValue === 'object') {
                            setValue(newValue.title);
                        } else {
                            setValue(newValue);
                        }
                    }}
                    onInputChange={(event, newValue, reason) => {
                        if (reason === 'clear' || reason === 'removeOption') {
                            setSearchValue([])
                            return
                        } else if (typeof newValue === 'string') {
                            setSearchValue([])
                            return
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        return filtered;
                    }}
                    selectOnFocus
                    open={true}
                    autoSelect={true}
                    clearIcon={(null)}
                    options={searchValue || []}
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        // Regular option
                        return option.title;
                    }}
                    renderOption={(props, option) => {
                        props.key = option.id
                        return (
                            <li {...props}>
                                <Link className={styles.search_result__link} to={(option.type !== 'person')? `/details/${option.type}/${option.id}` : `/person/${option.id}`}>
                                    <div className={styles.search_result__poster}>
                                        <img alt={option.title} loading="lazy" src={option.image} width="50" />
                                    </div>
                                    <div className={styles.search_result__text}>
                                        <div>{option.title}</div>
                                        <div>{option.year}</div>
                                    </div>
                                </Link>
                            </li>
                        )
                    }}
                    freeSolo
                    renderInput={(params) => (
                        <>
                            <TextField
                                sx={{ ml: 1, flex: 1 }}
                                {...params}
                                onChange={(event) => {
                                    setValue(event.target.value);
                                }}
                                className={styles.input_search}
                                placeholder="Search for a movie, tv show, person......"
                            />
                            <Button type="button"
                                className={styles.submit_search} onClick={() => navigate(
                                    {
                                        pathname: "/search",
                                        search: createSearchParams({
                                            query: value
                                        }).toString()
                                    }
                                )}>
                                Search
                            </Button>
                        </>
                    )}
                />
            </Paper>
        </div>
    )
}

export default SearchField