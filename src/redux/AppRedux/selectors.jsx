export const selectPlaces = state => state.contacts.contacts.places;

export const selectSavedPlaces = state => state.contacts.contacts.savedPlaces;

export const selectCatPics = state => state.contacts.contacts.catPics;

export const selectDogPics = state => state.contacts.contacts.dogPics;

export const selectContactsFilter = state => state.filter;

export const selectIsLoading = state => state.contacts.contacts.isLoading;

export const selectCatPageNums = state => state.contacts.contacts.catPageNums;

export const selectDogPageNums = state => state.contacts.contacts.dogPageNums;

export const selectIsCatPicsLoading = state => state.contacts.contacts.isCatPicsLoading;

export const selectIsDogPicsLoading = state => state.contacts.contacts.isDogPicsLoading;

export const selectIsGenKey = state => state.contacts.contacts.isGenKey;

export const selectIsUpdateLoading = state => state.contacts.contacts.isUpdateLoading;

export const selectIsSavedPlacesLoading = state => state.contacts.contacts.isSavedPlacesLoading;

export const selectIsSelectedSavedPlaceLoading = state => state.contacts.contacts.isSelectedSavedPlaceLoading;

export const selectIsDeletePlacesLoading = state => state.contacts.contacts.isDeletePlacesLoading;

export const selectIsRetKey= state => state.contacts.contacts.isRetKey;

export const selectError = state => state.contacts.contacts.error;

export const selectGenApiKeyError = state => state.contacts.contacts.genApiKeyError;

export const selectretrieveApiKeyError = state => state.contacts.contacts.retrieveApiKeyError;

export const selectOpenModal = state => state.contacts.contacts.openMyModal;

export const selectOpenSortedAllModal = state => state.contacts.contacts.openMyAllModal;

export const selectOpenSortedPendingModal = state => state.contacts.contacts.openMyPendingModal;

export const selectOpenSortedCompletedModal = state => state.contacts.contacts.openMyCompletedModal;

export const selectOpenSortedPastDueModal = state => state.contacts.contacts.openMyPastDueModal;

export const selectedContact = state => state.contacts.contacts.selectedContact;

export const selectedSavedPlace = state => state.contacts.contacts.selectedSavedPlace;

export const selectedSortedAllContact = state => state.contacts.contacts.selectedSortedAllContact;

export const selectedSortedPendingContact = state => state.contacts.contacts.selectedSortedPendingContact;

export const selectedSortedCompletedContact = state => state.contacts.contacts.selectedSortedCompletedContact;

export const selectedSortedPastDueContact = state => state.contacts.contacts.selectedSortedPastDueContact;

export const selectedIsSlideLoading = state => state.contacts.contacts.isSlideLoading;

export const selectedIsSlideError = state => state.contacts.contacts.isSlideError;

export const selectFilterUp = state => state.contacts.contacts.filterUpLimit;

export const selectFilterDown = state => state.contacts.contacts.filterDownLimit;

export const selectCategoryName = state => state.contacts.contacts.categoryName;

export const selectCountryName = state => state.contacts.contacts.countryName;

export const selectOpenMobileAndTabModal = state => state.contacts.contacts.openMyMobileAndTabModal;

export const selectOpenAllMobileAndTabModal = state => state.contacts.contacts.openMyAllMobileAndTabModal;

export const selectOpenPendingMobileAndTabModal = state => state.contacts.contacts.openMyPendingMobileAndTabModal;

export const selectOpenCompletedMobileAndTabModal = state => state.contacts.contacts.openMyCompletedMobileAndTabModal;

export const selectOpenPastDueMobileAndTabModal = state => state.contacts.contacts.openMyPastDueMobileAndTabModal;

export const selectKey = state => state.contacts.contacts.key;

export const selectKeyName = state => state.contacts.contacts.keyName;

export const selectKeyId = state => state.contacts.contacts.keyId;

export const selectKeyDate = state => state.contacts.contacts.keyDate;
