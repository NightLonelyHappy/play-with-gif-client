export const inputImage = (buffer) => ({
    type: 'INPUT_IMAGE',
    buffer
});

export const setImageCount = (count) => ({
    type: 'SET_IMAGE_COUNT',
    count
});

export const newImageItem = (item) => ({
    type: 'NEW_IMAGE_ITEM',
    item
});