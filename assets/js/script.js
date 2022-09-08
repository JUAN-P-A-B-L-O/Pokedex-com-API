/////30 min de video
const pokemonName = document.querySelector(`.pokemon__name`);
const pokemonNumber = document.querySelector(`.pokemon__number`);
const pokemonImage = document.querySelector(`.pokemon__image`);
const form = document.querySelector(`.form`);
const inputSearch = document.querySelector(`.input__search`);
const prevButton = document.querySelector(`.btn-prev`);
const nextButton = document.querySelector(`.btn-next`);
const ability = document.querySelector(`.ability`);
const special = document.querySelector(`.special`);
const secondarySpecial = document.querySelector(`.secondaryspecial`);
const test = document.querySelector(`.test`);

let pokemonIdNow = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponsee = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponsee.status === 200) {
        const data = await APIResponsee.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = `Loading/...3`;
    pokemonNumber.innerHTML = ``;

    const data = await fetchPokemon(pokemon);
    if (data) {

        pokemonImage.style.display = `block`;
        special.innerHTML = data[`abilities`][0][`ability`][`name`];
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data[`sprites`][`versions`][`generation-v`][`black-white`][`animated`][`front_default`]
        inputSearch.value = ``;
        const seconAbility = data[`abilities`];
        test.innerHTML= data[`forms`][`0`][`url`];
        if (seconAbility.length > 1) {
            secondarySpecial.innerHTML = data[`abilities`][1][`ability`][`name`];
            return;
        }
        secondarySpecial.innerHTML = `Nonexistent`;



        return;
    }
    pokemonImage.style.display = `none`;
    pokemonName.innerHTML = `Not found :((((`;
    pokemonNumber.innerHTML = ``;
}



form.addEventListener(`submit`, (e) => {
    e.preventDefault();
    pokemonIdNow = Number(inputSearch.value);
    renderPokemon(inputSearch.value.toLowerCase());
})
prevButton.addEventListener(`click`, (e) => {
    if (pokemonIdNow === 1) return;
    pokemonIdNow -= 1;
    renderPokemon(pokemonIdNow);
})
nextButton.addEventListener(`click`, (e) => {
    if (pokemonIdNow === 649) return;
    pokemonIdNow += 1;
    renderPokemon(pokemonIdNow);
})

renderPokemon(pokemonIdNow);


////// parte de informacoes do pokemon

