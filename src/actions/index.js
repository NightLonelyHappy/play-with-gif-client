export const setMainImage = (image) => ({
    type: 'SET_MAIN_IMAGE',
    image
});

export const setPeerImage = (image) => ({
    type: 'SET_PEER_IMAGE',
    image
});

export const setImageCount = (count) => ({
    type: 'SET_IMAGE_COUNT',
    count
});

export const newImageItem = (item) => ({
    type: 'NEW_IMAGE_ITEM',
    item
});