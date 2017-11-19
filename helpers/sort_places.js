module.exports = places => {
  return places
    .map(place => {
      const arabic = place.ar && place.ar.name;
      const english = place.en && place.en.name;

      return {
        name: english && arabic ? `${english} / ${arabic}` : english || arabic,
        id: place._id
      };
    })
    .sort((indexA, indexB) => {
      const firstName = indexA.name.toUpperCase();
      const secondName = indexB.name.toUpperCase();
      return firstName < secondName ? -1 : 1;
    });
};
