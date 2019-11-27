# Bugs

# Build

# Cleanup

# Big Issues

## Scaling + Search + Pagination

: well search and pagination kinda suck with firebase (see firebase problems below)

## Validation

- Backend Validation
  - Move rules to source control instead of the web admin

# By Topic

## Ticky Techy

## UI UX

- saving workflow

  - support fork
  - disable (or allow toggle) live preview
  - live previewing javascript dangerous for non terminating loops
  - add keyboard shortcuts?!
  - saving on your own file 1) saves 2) updates view
  - saving on someone elses file 1) saves to local storage 2) upates view 3) add message prompting user to fork or reset (time out after a day, count down)

- ? Highlight auth user (and maybe their sketches) in lists

## Sketches

## Profile

- x Add Change Picture option (to other picture online url, no uploading)
- no. Add Description Field
- tie image to gitub image
  - auto update github name and github image

## Scaling Pagination Filter

# Not MVP Features

- Forking

  - Simple save as
  - Keep history of file
  - List sketches that fork from

- Categories/Tags/Collecitons

- Random Script Generator

# Auth

- Syncing usernames from github is probably a bad idea. Imagine
  Anne is zero_cool on github
  Bary is crash_overdrive on github
  Anne makes an account on smudge called zero_cool
  Anne changes name to zero_cooler
  Bary changes name to zero_cool on github
  Bary creates an account on smudge .... but zero_cool is taken

  Basically can't assume that username on github is the same as on smudge

* auth should check for changes to username and image every load
  - nope see above
* auth needs to subscribe to profile changes in case display name etc changes

  - this is needed so that things that use auth.dispalyname and auth.photoURL, etc are updated.
  - but this doesn't happen that much...

  - Does Auth even need to pull data from the profile anymore?

# Technical Debts

- Usernames are set from github but on the front end and could be changed. Backend could enforce unique usernames and allow username to be set only at creation, not edited. This would -mostly- prevent people from setting their username to something other than whats on github.
- (changing username no longer allowed) Changing username needs to update denormalized data
- Backend validation isn't happening

# Problems with Firestore

- pagination doesn't work so well

  - cant get a document count for a collection
    https://stackoverflow.com/questions/46554091/cloud-firestore-collection-count
  - can't set a pagination offest by index (only by start at a sorted value postion)
  - This might make sense for large scalability, but still a problem if you want to do this.

- no text search/fuzzy text search.

  - you _cant_ do "ppl" -> "apple"
  - you _can_ sort alphabetically and pull the first record after a search. "apple", "cat", "dog" you could search for "c" -> "cat" "b" -> "cat" also...

- firestore is backendless but you just end up making a backend with rules and functions
  - enforcing unique is a bit of a thing
    https://stackoverflow.com/questions/47405774/cloud-firestore-enforcing-unique-user-names
  - probably best to make a `setUsername` cloud function

# Won't Dos

I don't really like VeeValidate or how validating is tied to the interface more than the data model. I'd like to pull out VeeValidate altogether, and have Sketch and User objects handle all of this:

1. Binding to firebase, auto updating
2. Tracking validation and dirty status
3. Tracking reset/cancel values (original values since last save)
