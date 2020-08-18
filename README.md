# **VIRTUAL ML LAB**
 ![Node.js CI](https://github.com/GrayHat12/Virtual-Ml-Lab/workflows/Node.js%20CI/badge.svg)

# TESTING

Steps :

- Go to the project folder
- `npm install` to install dependencies
- `npm install -g @ionic/cli` to install ionic cli globally
- `ionic serve` to run the web version of app

## For Andoid Build

- `ionic build` for generating a development build or
  `ionic build --prod` for production build
- `ionic cap add android` **only once**
- `ionic cap open android` to open the project in android studio

## For IOS Build

- `ionic build` for generating a development build or
  `ionic build --prod` for production build
- `ionic cap add ios` **only once**
- `ionic cap open ios` to open the project in xcode

## For Desktop Build

- `ionic build` for generating a development build or
  `ionic build --prod` for production build
- `ionic cap add electron` **only once**
- `ionic cap open electron` to launch application

## Note:

- Always use `npx cap copy` to update the build rather than executing `ionic cap add <platform>`
