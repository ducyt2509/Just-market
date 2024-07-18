import { combineReducers } from '@reduxjs/toolkit';
import count from './slice/count';

const reducer = combineReducers({
    count: count
});

export default reducer;
