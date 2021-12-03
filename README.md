# Flashsend

This is a Vue.js app implementing a classic Pokedex from Pokemon world. Its a tool that gives you information about each pokemon.  General information about it's characteristics, statistics, evolutions. Enriched with some animations and fancy colors.  
The app is live [here](https://simplepokedex.netlify.app/)!

## Technologies Used
- [Vue 3](https://v3.vuejs.org/) 
- [PokeAPI](https://pokeapi.co/) for all the pokemon data.
- [Vue Router](https://router.vuejs.org/) for basic routing.
- [SASS](https://sass-lang.com/) all styles with scoped view in each component.
- [GSAP](https://greensock.com/gsap/) for every animation in the app.
- [Vue Feather Icons](https://vue-feather-icons.egoist.sh/) for search bar icon.

## Achived Functionality

-  Presentation list of all pokemons (provided by PokeAPI), using beautiful card Components and infinite scrolling.
- Search for every pokemon's name or part of it.
- Hovering over a pokemon card makes pokemon float. 
- When you press on a card, vue router redirects you to the pokemon profile.
- Pokeball throw like animation effect.
- Pokemon profile page includes, pokemon information, statistics, type vulnerabilities and evolution tree.
- Local storage usage to remember the user's position on list when he decides to go back to the list from a pokemon profile. 
