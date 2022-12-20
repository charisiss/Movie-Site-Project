## Movie Site Project

This is a react app that I created to exercice.
It is a simple movie website like IMDb, that you can watch trailers of some movies and learn more about them.

## Contents

- [Movie Site Project](#movie-site-project)
  - [Contents](#contents)
  - [Installation and Running](#installation-and-running)
  - [Testing](#testing)
  - [Building](#building)
  - [Philosophy](#philosophy)
    - [Testing](#testing)
    - [State Management](#state-management)
    - [Styling](#styling)
    - [Fetching API data](#fetching-API-data)
    - [Responsive Styles](#responsive-styles)
    - [Project Structure](#project-structure)
    - [Environmental Variables](#environmental-variables)
    - [Questions Managment](#questions-managment)

## Installation and Running

In the project directory, you can run:

```shell
npm install
```

This will install all dependencies for you. From there run:

```shell
npm run dev
```

To get the app up and running. Your browser should open up to the app, otherwise check the console
for the url to visit. When you save a file it should compile and reload the app.

## Testing

The following will run all tests with code coverage:

```shell
npm test
```

## Building

Build the production assets of the app with:

```shell
npm build
```

This will correctly bundle React in production mode and optimize the build for the best performance.

## Philosophy

This is a very brief explanation of the most important decisions that were made.

### Testing

100% of all tests are written with `react-testing-library`.

Tests were written in such a way so they can serve as documentation for the components that are being tested. It is encouraged to read them in order to get a better understanding of the components themselves.

90% test coverage is achieved.

### State Managment

State is kept local and low. There is no global state as it wasn't necessary. Scaling this I might realise that I need some global state. If that's the case, then I will look to manage it with Context. If that's not enough, then I might consider libraries like Redux.

### Styling

`Module CSS` were used to style all components. A basic layout is created. Look for the Layout.tsx to get a better idea of the Layout structure.

### Fetching API data

I found [Owen Wilson wow API](https://owen-wilson-wow-api.onrender.com/). I decided to use it here for the first time. It's a good API but I had a lot of problems with server respond some times.

### Questions Managment

I used [Open Ai Chat Bot](https://chat.openai.com/chat) to ask a lot of question about React, also that helped me out with some errors that I had.
