export const getImageData = (imgId) => {
    fetch(`/gifs/?id=${imgId}`)
        .then((res) => res.arrayBuffer())
        .then((data) => Promise.resolve(new Uint8Array(data)));
};