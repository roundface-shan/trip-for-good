import { Middleware } from 'redux';

export const actionLog: Middleware = (store) => (next) => (action) => {
    console.log('state before action', store.getState())
    console.log('action', action)
    next(action)
    console.log('state after action', store.getState())
};