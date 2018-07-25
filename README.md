# Currency Converter App

## ALC/GOOGLE/UDACITY Mobile Web Specialist Track Project

[Try it out!](https://refinedblessing.github.io/Kudi/)

### Convert your Kudi(Money)

This project consumes the free.currencyconverterapi.com, the main point of the project was to create an application that used modern day developer tools to solve an age-long problem.

#### Problems
Internet is sometimes slow;
you are online and yet offline, which Jake Archibald calls lie-f;
What is the point of fetching the same static page from the server over and over again.

#### Solution
##### Here comes service workers:

I know you are thinking, what is a service worker ?

A service worker is a background script that your browser runs separate from the web page, that doesn't need the user or web pages' interaction.

##### Notables

The service worker doesn't access the DOM directly.

It communnicates with the page it's installed on by responding to messages sent via it's postMessage interface and the messages in turn can then result in DOM manipulation if needed.

It's a programmable network proxy, allowing for control over network requests to page.

Service workers allows us to use the CacheAPI and the IndexDB in our browser.

The CacheAPI helps us store static assets, those assets that are usually there to stay, css, non-changing data, and even html.

The IndexDB is used for storing much larger data, requests to API's, like in my case the ratings.

With these tools, I was able to build out the currency-converter to work offline and use data from previous requests, or static data stored in the CacheAPI and IndexDB delivered with the help of the service worker.

##### Challenges
Setting up service worker in a React application that uses webpack for bundling and babel for transpiling, there was very little info for this use case as most people used create-react-app.

##### Highlights
Finding Workbox, a tool that I used to serve the service-worker file and bring in all the urls I needed to cache.

By Blessing Edugie Ebowe

2018
