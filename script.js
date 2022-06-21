/* (async function findPokemonData () {
    const result = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    const {results} = await result.json()
    const pokemons =  await Promise.all(results.map(async element => {
        const forResult = await fetch(element.url)
        const forData = await forResult.json()  
        return forData    
    })) 
    pokemons.forEach(pokemon => { 
        createCard(pokemon)     
    });
})()
 */

(async function findPokemonData () {
    const result = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    const {results} = await result.json()
    const pokemons =  await Promise.all(results.map(async (element) => {
        const forResult = await fetch(element.url)
        const forData = await forResult.json()  
        return forData    
    })) 
    pokemons.forEach(pokemon => { 
        createCard(pokemon)     
    });
})()


function createCard(data) {
    const card = document.createElement("div")
    card.classList.add("card")

    const cardID = document.createElement("div")
    cardID.classList.add("id-pokemon")
    cardID.textContent = `#${data.id}`
    card.append(cardID)

    const cardImage = document.createElement("img")
    cardImage.classList.add("card-image")
    cardImage.src = data.sprites.front_default
    card.append(cardImage)

    const cardName = document.createElement("h2")
    cardName.textContent = data.name
    card.append(cardName)

    const cardType = document.createElement("div")
    cardType.classList.add("card-type")
    cardType.textContent = data.types[0].type.name.toUpperCase()
    card.append(cardType)

    const cardPlace = document.querySelector("#card-place")
    cardPlace.append(card)


    if(cardType.textContent === "FIRE") {
        card.style.backgroundColor = "orange"
    } 
    if(cardType.textContent === "WATER") {
        card.style.backgroundColor = "#66d9ff"
    }
    if(cardType.textContent === "BUG") {
        card.style.backgroundColor = "#2d912d"
    }
    if(cardType.textContent === "NORMAL") {
        card.style.backgroundColor = "#ffe4c4"
    }
    if(cardType.textContent === "ELECTRIC") {
        card.style.backgroundColor = "#ffff4d"
    }
    if(cardType.textContent === "POISON") {
        card.style.backgroundColor = "#ab8fc7"
    }
    if(cardType.textContent === "FAIRY") {
        card.style.backgroundColor = "lightpink"
    }
    if(cardType.textContent === "GROUND") {
        card.style.backgroundColor = "#806043"
    }
    if(cardType.textContent === "FIGHTING") {
        card.style.backgroundColor = "#ffc6af"
    }
    if(cardType.textContent === "ROCK") {
        card.style.backgroundColor = "#868686"
    }
    if(cardType.textContent === "GHOST") {
        card.style.backgroundColor = "#c4bce4"
    }
    if(cardType.textContent === "ICE") {
        card.style.backgroundColor = "rgb(210,235,255)"
    }
    if(cardType.textContent === "PSYCHIC") {
        card.style.backgroundColor = "#F85888"
    }
    if(cardType.textContent === "DRAGON") {
        card.style.backgroundColor = "#A27DFA"
    }
   
}


