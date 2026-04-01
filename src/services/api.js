export async function fetchCards() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=16");
  const data = await res.json();

  const detailedData = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const info = await res.json();

      return {
        id: info.id,
        name: info.name,
        image: info.sprites.front_default,
      };
    })
  );

  return detailedData;
}