# An image CRUD application thing

## Introduction

This is my second proper ReactJS project. Already without it being finished, I've learned more and become more accustomed to ReactJS compared to when I started and finished my first project. The purpose for this project is to have an application that a user can log or register in and add or remove images in the forms of posts, similar to social media platforms. This is to be accomplished using Firebase, which I am completely new and excited to learn more about it. Overall technologies used and to be used are:

- ReactJS
- HTML/CSS
- JavaSript
- NodeJS
- Firebase

A demo of this, which does not contain any of the CRUD aspects or connections to Firebase, will be published on Github Pages because it still showcases what I did in plain ReactJS. You can view it in the OnlyLogin-Branch of this repository. 

## Functionality and features

Many of the Firebase features are in place already and those would include:

- The ability for a user to login or register using username/email and password with Firebase authentication, which has custom security rules set in place for writing and reading data
- The ability to add images with a specific title and description for them. These posts get their image file sent into Firebase storage while other details as well as the link to the image in storage go into a user specific Firestore document.
- The ability to view all of your own posts as well as individual ones based on their unique ids and specific paths, which are fetched from Firestore and displayed to the user. 

Features still missing, but which I will likely implement:
- The ability to Delete and edit posts.
- The ability to view posts from other users in the Home page in a large randomly generated gallery.
- The ability to look at other user profiles by either finding them through the Home page gallery or searching for them specifically.

Functionality that exists on the plain demo and will be expanded on in the finished project are:

- A login with a predetermined username and password (User, 1234)
- Automatic logout features, which kick in after 10 seconds of inactivity with an additional 60 seconds warning in a popup
- Responsive navigation menu

(Images of the final project and examples here or it's own section)

## Known bugs

- When logged out, data can still be retrieved. This is because the user id is retreived directly from the url. Just need to fix this by adding a function that checks if the user trying to access that page and component is not null.
