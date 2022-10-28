## Oct 27

We weren't really crazy about the color scheme we had come up with for out site. We looked around online for some nice color palletes and finally decided on some blue tones. Spent some time changing all the CSS for the new colors we wanted and added some nice buttons to the homepage. Spent the rest of the afternoon with an instructor going thru the deployment process, mostly fixing linting issues in the code (thank god for Black). Didn't quite finish that up today, but we should be deployed by tomorrow.

## Oct 26

Started on deployment. We worked through a lot of the pages on the CI/CD exploration. I heard that some of the other teams were having some issues with deployment, so I figured it would take a while. We got as far as we could but then we reached out to Daniel, one of the instructors from the pt cohort and set up some time for him to help us tomorrow.

## Oct 25

We spent much of the day finally merging branches and making sure everything was working, and then wrote some unit tests. I started off writing the only unit test we had that didn't require any sort of authorization. We got stuck once authorization was required, because nearly all of our CRUD requires some sort of authorization. We were able to get help from the instructors who walked us through faking tokens so that we could finally get our tests to run...and PASS.

## Oct 24

We had the practice exam today, after that just putting some of the finishing touches on some of the different pages, most features are complete, but still need to work on deployment. Going back through the cookbooks for CI/CD and it looks like quite a lot.

## Oct 20

Mostly modified out login and signup forms and pages. Read up on and re-watched the videos from the explorations on React.

## Oct 19

Curtis joined us in out breakour room to go over what we had written in RTKQuery for our authentication token. Even though we used his code for a base to write our own, I personally wasn't sure how a lot of the different pieces interacted with one another so it was nice to have him walk us through it, and I was better able to understand what was going on afterwords.

## Oct 18

Built a search form for our advanced search feature. We didn't end up using it, however it was cool to be able to make something that looked like some of the mockups we initially had in out Whimsical wireframes.

## Oct 17

Worked on making a footer for the page. It was a pretty decent way to get myself back into some CSS since I had to watch some videos and read a alot. This was also useful in understanding more about React Router and how you want static components to exist inside of App.js

## Oct 14

We changed everyting over to bootstrap today. One of the more intersting things about the experience of installing extra dependecies in your package.json is that if you don't install them in the correct spot you can't use them (and by interesting, I mean i made this mistake -twice).

## Oct 13

After initially setting up most of the site in material UI, we decided that it would be best to stick with what we know and what we have used to go back to bootstrap. I think that with this length of this project it will be a little easier to dig into some of the bootstrap code and customize things that we didn't have time to on previous projects. Also, bootstrap docs are great.

## Oct 12

Started on front-end today. Spent most of the day trying to familiarize myself with Material UI. After a lot of playing around, we did get a couple pages set up and looking nice, but the MUI documentation is pretty lean and it's tough to figure out how to interact with it.

## Oct 11

Split up into groups and finished back end of application. All that was left to do was to create a method to add and remove cards to a deck and to finish up the advanced search feature. It was determined that the advanced search can be handled with filters from the front-end, and with some group coding we were able to add cards to the decks. Afterwords we finished up removing single cards annd multiple cards at once from the deck. Onto to the front-end tomorrow.

## Oct 10

Implemented account logon and logoff. We thought we had found some issues in the JWTDown for FastAPI where you got an access_token when logging on, but if you logged off and back on with the same user you recieved an identical token. We were told this is how the code was written, but would be changed. Afterwords we worked on setting up the routes for our external API request. Our external API returns loads of data, so we ended the day trying to determine the best way to filter through what we do and don't need.

## Oct 6th

Determined that Mongo was the right way to go for the backend. We split up into two groups of two and re-wrote all of our queries and routers to work with Mongo. None of us had really any experience at all with Mongo, so it was pretty cool to learn along with one another.

## Oct 5th

Discussed with team how the structure of out data should look. We had started writing the backend in Postgres, but determined that it did not really suit how we would want to interact with out data. Off to research mongo!

