.card:hover {
    width: 215px;
    height: 275px;
    transform: rotateY(180deg);
    cursor: pointer;
    transition: all ease-in .5s;
}


   const nextResult = await fetch(next)
    const resultNext = await nextResult.json()
    const resultNextFinal = resultNext.next
    if(next == resultNextFinal) {
        result = resultNextFinal
    }