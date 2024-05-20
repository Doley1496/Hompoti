/* */

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Work Sans", sans-serif;
}


html {
  font-size: 72.5%;
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
   scrollbar-color: rgb(98 84 243);
    scrollbar-width: thin;
}

body::-webkit-scrollbar {
  width: 1.5rem;
}

body::-webkit-scrollbar-track {
   background-color: rgb(24 24 29);
}

body::-webkit-scrollbar-thumb {
 
  background: #fff;
    border: 5px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
}


.container {
  max-width: 120rem;
  margin: 0 auto;
}

.grid-two-column {
  grid-template-columns: repeat(2, 1fr);
}

.grid-three-column {
  grid-template-columns: repeat(3, 1fr);
}

.grid-four-column{
   grid-template-columns: 1fr 1.2fr .5fr .8fr ;
}

.grid-five-column{
  grid-template-columns: repeat(5, 1fr);
}

.common-heading {
      font-size: 3.8rem;
      font-weight: 600;
      margin-bottom: 6rem;
      text-transform: capitalize;
}

.intro-data {
      margin-bottom: 0;
      text-transform: uppercase;
      color: #5138ee;
}

@media (max-width: ${({ theme }) => theme.media.tab}) {
  /* */

    .container {
      max-width: 130rem;
      padding: 0 3.2rem;
    }

  }

   @media (max-width: ${({ theme }) => theme.media.mobile}) {
   /* */

    html {
      font-size: 50%;
    }

     .grid{
      gap: 3.2rem;
    } 
    

    .grid-two-column , .grid-three-column, .grid-four-column{
      grid-template-columns: 1fr;
    }

    /* */
    }

`;
