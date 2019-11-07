# Bugs

- auth needs to subscribe to profile changes in case display name etc changes

# Cleanup

- create a list widget, share for sketches and for user list

# Broad Features

- x Add timestamps to sketches

- Fronted Validation

  - x add veevalidate
  - x refactor inherit input into component
  - x refactor submit button
    - x add invalid color state
  - x validate sketches view

- Backend Validation
- remove keen?

- Profiles
  - Better User Signin/Out Name Pic widget
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
