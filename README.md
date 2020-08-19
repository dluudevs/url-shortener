## Url-Shortener 
__Requirements:__
  1. Entering a URL will return a JSON response with a shortened URL and append it to the DOM
  2. URLs with an invalid domain name will return "Invalid Url" in the JSON response and change the placeholder of the input
  3. Visiting a shortened URL will redirect the client to the original link
  
Live version of the application can be found [here](https://dluu-shorturl.herokuapp.com/)

## Table of Contents 
  * [Installation](https://github.com/dluudevs/url-shortener#installation)
  * [Languages](https://github.com/dluudevs/url-shortener#languages)
  
## Installation
  * `npm install` to install local packages
  * `npm run dev` to run the app
 
## Languages
  * Node, Mongoose and Express were used to develop the back-end 
  * Handlebars (HBS) used as the templating language along with HTML and CSS for the front-end
  * And lastly, JavaScript was used for the form to interact with the back-end
