export const bangkokCoords = { lat: 13.736717, lng: 100.523186 };

export const generateMarkers = count =>
  [...Array(count)].fill(0).map((__, index) => ({
    // fill(0) for loose mode
    id: index,
    lat: bangkokCoords.lat +
      0.01 *
        index *
        Math.sin(30 * Math.PI * index / 180) *
        Math.cos(50 * Math.PI * index / 180) +
      Math.sin(5 * index / 180),
    lng: bangkokCoords.lng +
      0.01 *
        index *
        Math.cos(70 + 23 * Math.PI * index / 180) *
        Math.cos(50 * Math.PI * index / 180) +
      Math.sin(5 * index / 180),
}));
