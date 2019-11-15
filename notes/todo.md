# Bugs

- auth needs to subscribe to profile changes in case display name etc changes

# Cleanup

- create a list widget, share for sketches and for user list
- remove About.vue

# Big Issues

## Scaling + Search + Pagination

- Given that we can't do text search, do we want to support search at all for sketches, users?

  - Should we remove sketch filter feature now since it might not scale?

- Should we put in pagination for sketches, users?

- Do we need to change storage of sketches so that grabbing the names of every sketch for a user is more reasonable (currently we are getting the code also)

## Validation

- Add vee validate

  - x add it
  - review it, is it clean?

- Backend Validation
  - Move rules to source control instead of the web admin

# By Topic

## UI UX

- it is not clear that you can edit the dotted underlined fields

- saving workflow

  - support fork
  - disable (or allow toggle) live preview
  - live previewing javascript dangerous for non terminating loops
  - add keyboard shortcuts?!

- ? Highlight auth user (and maybe their sketches) in lists

## Sketches

## Profile

- Add Change Picture option (to other picture online url, no uploading)
- Add Description Field

## Scaling Pagination Filiter

# Not MVP Features

- Forking

  - Simple save as
  - Keep history of file
  - List sketches that fork from

- Categories/Tags

- Random Script Generator

# Technical Debts

- Usernames are not enforced to be unique on backend. #bigdeal
- Changing username needs to update denormalized data
- Backend validation isn't happening
