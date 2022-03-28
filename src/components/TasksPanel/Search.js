import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearch, clearSearch } from 'features/search';
import { useTheme } from 'theme/ThemeProvider';
import SmallIconButton from './components/SmallIconButton';
import plusIcon from 'assets/icons/plus.png';

export default function Search() {
    const selector = useSelector((state) => state.search.value);
    const dispatch = useDispatch();

    const darkMode = useTheme();

    const style = {
        alignItems: 'center',
        background: darkMode ? '#2e3047' : '#eaf4f2',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'row',
        padding: '6px 16px',
    };

    const inputStyle = {
        background: 'rgba(0, 0, 0, 0)',
        border: 'none',
        color: darkMode ? '#ffffff' : '#000000',
        flex: '1 auto',
        margin: 0,
        padding: 0,
        outline: 'none',
    };

    return (
        <div style={style}>
            <input
                type="text"
                placeholder="search"
                style={inputStyle}
                value={selector.query}
                onChange={e => dispatch(updateSearch(e.target.value))}
            />
            <div
                style={{
                    margin: 0,
                    padding: 0,
                    transform: 'rotate(45deg)'
                }}
            >
                <SmallIconButton
                    icon={plusIcon}
                    onClick={_ => dispatch(clearSearch())}
                />
            </div>
        </div>
    );
}
