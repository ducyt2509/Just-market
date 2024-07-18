import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import rootReducer from './reducer';
const store = configureStore({
    reducer: rootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
const { dispatch } = store;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;
export { store, dispatch, useSelector, useDispatch };
