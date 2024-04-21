# rotten-potatoes

## user stories

### part 1

- Users can view all reviews (index)
- Users can create a review (new/create)
- Users can view one review (show)
- Users can edit a review (edit/update)
- Users can delete a review (destroy)
- Users can rsvp to reviews (/rsvps/create, /rsvps/new)
- Users can cancel their rsvp (/rsvps/destroy)
- Users can comment on reviews (comments#create)
- Users can delete comments (comments#destroy)

### part 2

- Users can see recent movies from TheMovieDB
- Users can see one Movie, including the poster and trailer
- Users reviews are associated with the corresponding movie
- Users can add or delete comments without requiring a page refresh
- Users can access an admin dashboard that lists all reviews and allows them to delete them

#### notes

installed mongo db with:

`brew install mongodb-community@7.0`

created a folder to save the db

`mkdir -p /data/db`

started the mongodb daemon

`mongod`

We use --save-dev when we want to save dependencies that will not be needed for pushing to production. In this case, we don't need our testing dependencies in production, so we use --save-dev instead of --save.

`mocha` - test runner, it actually runs our test code.

`chai` - assertion library, provides syntactic sugar to make writing tests intuitive

`chai-http` - helper test library, provides methods to make http requests inside tests easier.

prettier & other formatting stuff:

`npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node`

airbnb style guide
`npx install-peerdeps --dev eslint-config-airbnb`

create the `.prettierrc file`

installed eslint globally and created the file.
`sudo npm i -g eslint`

`eslint --init`
