const url = window.location.search
const urlParam = new URLSearchParams(url)
const linkParam = Number(urlParam.get("id"))
window.addEventListener("DOMContentLoaded", getPokemon)

async function getPokemon () {
    if(linkParam >= 1) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${linkParam}`) 
        const pokemon =  await response.json()
        createLinkCard(pokemon)
    }  
}


const cardColor = new Map()
    
    cardColor.set("FIRE", "orange")
    cardColor.set("WATER", "#66d9ff")
    cardColor.set("BUG", "#2d912d")
    cardColor.set("NORMAL", "#ffe4c4")
    cardColor.set("ELECTRIC", "#ffff4d")    
    cardColor.set("POISON", "#ab8fc7")
    cardColor.set("FAIRY", "lightpink")
    cardColor.set("GROUND", "#806043")
    cardColor.set("FIGHTING", "#ffc6af")
    cardColor.set("ROCK", "#868686")
    cardColor.set("GHOST", "#c4bce4")
    cardColor.set("ICE", "rgb(210,235,255)")
    cardColor.set("PSYCHIC", "#F85888")
    cardColor.set("DRAGON", "#A27DFA")
    cardColor.set("STEEL", "#e2e3e0")
    cardColor.set("DARK", "#b509ff")
    cardColor.set("GRASS", "lightgreen")
    cardColor.set("FLYING", "lightblue")

    function createLinkCard(data) {

        console.log(data)
        const cardPlace = document.querySelector("#card-place-link")
    
    
        const cardContainer = document.createElement("div")
        cardContainer.classList.add("card-container")
        cardPlace.append(cardContainer)
        
    
        const card = document.createElement("div")
        card.classList.add("card")
        cardContainer.append(card)
        
    
        
        const cardID = document.createElement("div")
        cardID.classList.add("card-id")
        cardID.textContent = data.id
        card.append(cardID)
    
    
        const cardName = document.createElement("div")
        cardName.classList.add("card-name")
        cardName.textContent = `Shiny ${data.name}`.toUpperCase()
        card.append(cardName)
    
    
        const cardFrontImgDIV = document.createElement("div")
        const cardFrontImg = document.createElement("img")
        cardFrontImg.classList.add("card-img-front")
        cardFrontImgDIV.append(cardFrontImg)
        cardFrontImg.src = data.sprites.front_shiny
        card.append(cardFrontImgDIV)
    
        const cardBackImgDIV = document.createElement("div")
        const cardBackImg = document.createElement("img")
        cardBackImg.classList.add("card-img-back")
        cardBackImgDIV.append(cardBackImg)
        cardBackImg.src = data.sprites.back_shiny
        card.append(cardBackImgDIV)
    
        /*const cardType = document.createElement("div")
        cardType.classList.add("card-type")
        cardType.textContent = data.types[0].type.name.toUpperCase()
        card.append(cardType)*/

    const cardType = data.types[0].type.name.toUpperCase()

    const color = cardColor.get(cardType)
    card.style.background = color


    if(data.types[1]) {
        const cardTypeTwo = data.types[1].type.name.toUpperCase()
        const colorY = cardColor.get(cardTypeTwo)
        card.style.background = `linear-gradient(45deg,${color},${colorY})`
    }
        
}

