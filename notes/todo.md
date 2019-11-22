# Bugs

- auth needs to subscribe to profile changes in case display name etc changes
  - this is needed so that things that use auth.dispalyname and auth.photoURL, etc are updated.
  - but this doesn't happen that much...

# Build

# Cleanup

- ? create a list widget, share for sketches and for user list
- remove About.vue

# Big Issues

## Scaling + Search + Pagination

- x Given that we can't do text search, do we want to support search at all for sketches, users?
  : no out of scope

- x Should we remove sketch filter feature now since it might not scale?
  : yes

- Should we put in pagination for sketches, users?
  : yes
  : users maybe get alphabet index

- Do we need to change storage of sketches so that grabbing the names of every sketch for a user is more reasonable (currently we are getting the code also)
  : not yet

## Validation

- Backend Validation
  - Move rules to source control instead of the web admin

# By Topic

## Ticky Techy

## UI UX

- it is not clear that you can edit the dotted underlined fields

- go to a popup modal for editing document info?

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

# Technical Debts

- Usernames are set from github but on the front end and could be changed. Backend could enforce unique usernames and allow username to be set only at creation, not edited. This would -mostly- prevent people from setting their username to something other than whats on github.
- (changing username no longer allowed) Changing username needs to update denormalized data
- Backend validation isn't happening
