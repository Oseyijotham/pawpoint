export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectToken = state => state.auth.token;

export const selectIsRegistered = state => state.auth.isRegistered;

export const selectUser = state => state.auth.user;

export const selectAvatar = state => state.auth.user.avatarURL;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectAll = state => state.auth;

export const selectSortAll = state => state.auth.all;

export const selectSortPending = state => state.auth.pending;

export const selectSortFulfilled = state => state.auth.fulfilled;

export const selectSortPastDue = state => state.auth.pastDue;