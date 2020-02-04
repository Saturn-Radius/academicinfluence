# Academic Influence Site

## What Technologies are Used?

 * Typescript
 * Postgres
 * Next.js

## How To Run

You need to create a .env file which defines environment variables that tell
the site where to find the database. You can see a sample .env file in .env.sample. An existing team member will be able to provide you with a .env
file which points to the live database which is probably what you want. 
You will also need to make sure that your IP address is whitelisted to
access the database.

Run `npm install` to install all dependencies.
Run `npm run dev` to run the dev server.

## How it Works

## CSS

The CSS is mostly configured using next-css with the css prop. I found this to be the most effective way for me
to work with styles, but I'm not dead set on it. If you have another way you prefer to work, I'm happy to consider doing it differently. 

## Page Routing

The common elements of any page is in pages/_app.js. The next.js router
looks inside pages/ to resolve the correct code to use for any individual
page. The module should export a default React Component. A component can
have a property "getInitialProps" defined which is an async function which
returns the data that the page will need. When server rendering, this will be
called on the server, when run during client rendering, it will run there.

## API

The API is defined in schema.ts. This defines a number of typescript types which form the api. There are pairs ending in Request and Response which define the Request/Response pairs available from the api. 

Run `npm run build-api` to build some boilerplate to support the api.

This will generate the api.ts module which is the primary access point to the api.
The api* function take a request and return a response promise.
 When running on the server, these functions directly call into the service/ implementations. When running on the client, these function use fetch to invoke the api. 

There are pages/api/* functions modules automatically created for each of the apis. These take care of parsing the incoming request and verifying it against the schema.



