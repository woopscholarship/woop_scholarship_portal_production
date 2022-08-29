import { writable } from 'svelte/store';
export const isLoggedIn = writable(false);
export const currentUser = writable({});
export const accountType = writable('');
export const userId = writable('');
export const userType = writable('');
export const phoneCodeValid = writable(true);
