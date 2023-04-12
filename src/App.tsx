import React from 'react';
import {
    BasicDropdown,
    FavoritesDropdown,
    GroupedWithoutFavoritesDropdown,
    GroupedWithFavoritesDropdown,
    SearchableDropdown,
    BasicWithPlaceholderDropdown,
    BasicWithoutPlaceholderDropdown,
} from './examples';

import './App.css';

function App() {
    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <div className='example-label'>Basic Example</div>
            <br />
            <BasicDropdown />
            <br />
            <br />
            <div className='example-label'>Basic Example with custom placeholder</div>
            <br />
            <BasicWithPlaceholderDropdown />
            <br />
            <br />
            <div className='example-label'>Basic Example without custom placeholder</div>
            <br />
            <BasicWithoutPlaceholderDropdown />
            <br />
            <br />
            <div className='example-label'>Favorites Example</div>
            <br />
            <FavoritesDropdown />
            <br />
            <br />
            <div className='example-label'>Grouped without Favorites Example</div>
            <br />
            <GroupedWithoutFavoritesDropdown />
            <br />
            <br />
            <div className='example-label'>Grouped with Favorites Example</div>
            <br />
            <GroupedWithFavoritesDropdown />
            <br />
            <br />
            <div className='example-label'>Searchable Example</div>
            <br />
            <SearchableDropdown />
        </div>
    );
}

export default App;
