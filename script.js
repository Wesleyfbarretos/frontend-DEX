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

let pokeCards = [];
let pokeCardsFilter = [];
let pokemons = [];


const typeBar = document.querySelector(".types")
const resetType = document.createElement("option")
resetType.textContent = "TYPES"
resetType.style.background = "white"
typeBar.append(resetType)

typeBar.addEventListener("click", ()=> {
    typeBar.style.background = cardColor.get(typeBar.value)
    if(typeBar.value == resetType.textContent) {
        typeBar.style.background = "white"
    }
})

for(t of cardColor) {   
    const typeElement = document.createElement("option")
    typeElement.textContent = t[0]
    typeBar.append(typeElement)
    typeElement.style.background = cardColor.get(typeElement.textContent)
}


let isFilteringByType = false

const filterButton = document.querySelector("#filter-button")
filterButton.addEventListener("click", async () =>  {
    pokeCardsFilter = [];
    isFilteringByType = true
    const barValue = typeBar.value
    pokeCardsFilter = await Promise.all(pokeCards.map(async (e) => {
        const pokeCardsUrl = await fetch(e.url) 
        return await pokeCardsUrl.json()
    }))
    const filteredTypes = pokeCardsFilter.filter((x) => {
        return x.types[0].type.name.toUpperCase().includes(barValue)
    })
        searchTypes()
})



function searchTypes () {
   if(typeBar.value != "TYPES") {
    const cardHide = document.querySelectorAll(".card")
    const showCard = document.querySelectorAll(`.${typeBar.value.toLowerCase()}`)  
        cardHide.forEach(hide => {
            hide.style.display = "none"
        })
        showCard.forEach(show => {
            show.style.display = "block"
        })
   } 
}
    // ******
const reset = document.getElementById("reset-button")
reset.addEventListener("click", async () => {
    const cardHide = document.querySelectorAll(".card")
    typeBar.value = resetType.textContent
    typeBar.style.background = "white"
    isFilteringByType = false
    cardHide.forEach(hide => {
        hide.style.display = "block"
    })

    
})

const searchBar = document.getElementById("searchbar")
let isFiltering = false;

async function search (filteredPokemons) {
    const cardPlace = document.querySelector("#card-place")
    cardPlace.innerHTML = ""
    pokeCardsFilter = await Promise.all(filteredPokemons.map(async (element) => {
       const filteredURL = await fetch(element.url)
       return await filteredURL.json()
   }))
   pokemons = pokeCardsFilter
   pokemons.forEach(element => {
       createCard(element)
   })
}




searchBar.addEventListener("keyup", (e) => {
    pokeCardsFilter = [];
    
    const searchPokemons = e.target.value.toLowerCase();
    isFiltering = searchPokemons.length > 0
    
    const filteredPokemons = pokeCards.filter((element) => {
        return (
             element.name.toLowerCase().includes(searchPokemons)
        )
    })
    search(filteredPokemons)
})



let resultNext = "https://pokeapi.co/api/v2/pokemon?limit=24"



async function findPokemonData (URL) {
    const result = await fetch(URL)
    const {next, results} = await result.json()
    resultNext = next
    pokeCards = pokeCards.concat(await results)
    console.log(pokeCards)
    pokemons =  await Promise.all(results.map(async (element) => {
        const forResult = await fetch(element.url)
        return await forResult.json()   
    })) 
        pokemons.forEach(pokemon => {   
            createCard(pokemon)  
    });
}

async function handleIntersect(entries, observer) {
    entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
            if(isFiltering == false && isFilteringByType == false) {
                await findPokemonData(resultNext)
            }

            
        }
    });
 }

document.addEventListener("DOMContentLoaded", () => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: .25
    };

 let observer = new IntersectionObserver(handleIntersect, options);
   observer.observe(loader);
})
    


function createCard(data) {

    const card = document.createElement("div")
    card.classList.add("card")
    
    
    const frontCard = document.createElement("div")
    frontCard.classList.add("front-card")
    card.append(frontCard)

    const backCard = document.createElement("div")
    backCard.classList.add("back-card")
    card.append(backCard)
            
    
            // FRONT CARD ID

    const frontCardId = document.createElement("div")
    frontCardId.classList.add("id-pokemon")
    frontCardId.textContent = `#${data.id}`
    frontCard.append(frontCardId)

            // BACK CARD ID

    const backCardId = document.createElement("div")
    backCardId.classList.add("id-pokemon")
    backCardId.textContent = `#${data.id}`
    backCard.append(backCardId)

            // FRONT CARD IMAGE

    const cardDivImage = document.createElement("div")
    const cardImage = document.createElement("img")
    cardDivImage.classList.add("card-image")
    cardImage.classList.add("card-img")
    cardDivImage.append(cardImage)
    cardImage.src = data.sprites.front_default
    frontCard.append(cardDivImage)

            // BACK CARD IMAGE

    const backCardDivImage = document.createElement("div")
    const backCardImage = document.createElement("img")
    backCardDivImage.classList.add("card-image")
    backCardImage.classList.add("card-img")
    backCardDivImage.append(backCardImage)
    backCardImage.src = data.sprites.back_default
    backCard.append(backCardDivImage)

             // FRONT CARD NAME

    const frontCardName = document.createElement("h2")
    frontCardName.innerHTML = data.name
    frontCard.append(frontCardName) 
    
            // BACK CARD NAME

    const backCardName = document.createElement("h2")
    backCardName.innerHTML = `<a href="./testando/index2.html?id=${data.id}" class="anchor" target="_blank">${data.name}</a>`
    backCard.append(backCardName)
    
            // CARD TYPE
    const cardType = document.createElement("div")
    cardType.classList.add("card-type")
    cardType.textContent = data.types[0].type.name.toUpperCase()
    
    const typesContainer = document.createElement("div")
    typesContainer.classList.add("types-container")
    typesContainer.append(cardType)
    frontCard.append(typesContainer)
    
    const cardSecondType = document.createElement("div")
    if(data.types[1]) {
        cardSecondType.classList.add("card-second-type")
        cardSecondType.textContent = data.types[1].type.name.toUpperCase()
        typesContainer.append(cardSecondType)
    }
    
            // CARD SPELL

    /*const cardSpell = document.createElement("div")
    cardSpell.classList.add("card-spell")
    const spellResult = data.abilities.map(ability => {
        const spellWay = ability.ability.name
        return spellWay
    })
    cardSpell.innerHTML = (spellResult) 
    backCard.append(cardSpell) */

    card.classList.add(cardType.textContent.toLowerCase())
    const cardPlace = document.querySelector("#card-place")
    cardPlace.append(card)

    
    const color = cardColor.get(cardType.textContent)
    card.style.background = color
    cardType.style.backgroundColor = color
    cardType.style.boxShadow = "1px 1px 15px 0px rgba(0, 0, 0, 0.2)"

    if(data.types[1]) {
        const colorY = cardColor.get(cardSecondType.textContent)
        card.style.background = `linear-gradient(45deg,${color},${colorY})`
        cardSecondType.style.background = colorY
        cardSecondType.style.boxShadow = "1px 1px 15px 0px rgba(0, 0, 0, 0.2)"
    }
// TIRAR E FAZER FICAR 0(1) COM GET - DIVERTIDO
   /* for(let t of cardColor) {
        if(cardType.textContent === t[0]) {
            cardType.style.backgroundColor = t[1]
            styleTypeone = t[1]
           }
        if(cardSecondType.textContent === t[0]) {
            cardSecondType.style.backgroundColor = t[1]
            styleTypetwo = t[1]
        }
    }
    function backgroundCard(data1, data2) {
         card.style.background = `linear-gradient(45deg,${data1},${data2})`
         if(!data2) {
            card.style.background =`linear-gradient(45deg,${data1}, transparent)`
         }
         
    }
    backgroundCard(styleTypeone, styleTypetwo)*/
}





  
