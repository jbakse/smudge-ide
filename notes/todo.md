# Bugs

- auth needs to subscribe to profile changes in case display name etc changes

# Cleanup

- create a list widget, share for sketches and for user list

# Broad Features

- x 0 characters is allowed!? on between? fix all fields
- x sketch not loading on initial sketch page load?

- add snackbar notice when save completes

  - x make it work
  - make it clean

- x Add active status to home page links (router active)
- x Add hover state to top menu

## UI UX

- it is not clear that you can edit the dotted underlined fields

- saving workflow

  - support fork
  - disable (or allow toggle) live preview
  - live previewing javascript dangerous for non terminating loops
  - add keyboard shortcuts?!

- relative dates in sketch listing

- Highlight auth user (and maybe their sketches) in lists

## Users

## Profile

- Sketches

  - x sketch listing in relative time (full time on hover)
  - Add filtering. Pagination (needed)

- Profile

  - Change Picture (to other picture online url, no uploading)
  - Add Description Field

- x is there a way to make the page load more "atomicly" so it doesn't flash in in steps?

- x Add timestamps to sketches

## Scaling Pagination Filiter

- Add pagination/search/filter (maybe not needed), sort by recent activity (log in, add a sketch)

  - Firebase doesn't support text search...

- Fronted Validation

  - x add veevalidate
  - x refactor inherit input into component
  - x refactor submit button
    - x add invalid color state
  - x validate sketches view

- Backend Validation

* Login Popup? or show waiting/spinner?
  - Bigger sign out: show message or redirect somewhere
* Profiles
  - x Better User Signin/Out widget (Name Pic Drop Down, etc)
  - User Profile RTF desc

# Specific Features

- Navigation Gaurds for Dirty

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
