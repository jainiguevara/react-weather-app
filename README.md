## Application Information (by: Jaini Guevara)

## API Configuration
Update the **APIID** variable inside **/api.js** to change API Keys for the API.

## Context/s:

### /context/WeatherContext.js
Contains all states and functions being used by the application. App.js used the WeatherProvide to wrap the WeatherApp component in order for the application to consume the context.

## Components:

### /components/WeatherApp.js
Component to render **CurrentWeather** and **WeatherForecast** components. Consumes **WeatherContext**'s error state to check and render an error message if the are network problems in the API.

### /components/CurrentWeather.js
Displays the current or selected weather information. Consumes the **WeatherContext** to populate the city, date, weather, temperature and temperature type. It also consumes the event called **handleTempTypeChange** to switch between Celsius and Fahrenheit.

### /components/WeatherForecast.js
Displays the 5-day weather forcast for the current or selected city. Consumes the **WeatherContext** to populate the day of week, weather, temperatures and temperature types. It also consumes the event called **handleSelectForecast** to select the forecast and display into the **CurrentWeather** component. It used the **focused** state to style the current selected weather forecast. 

### /components/Filter.js
Container for City and Weather Type filters. Consumes **WeatherContext** to get the list of cities and weather types. As well as the **handleSelectCity** and **handleSelectWeatherType** events. These states and functions will be passed to **SelectFilter** component properties.

### /components/SelectFilter.js
Common component to be used for rendering a customer drop down list. It requires the following properties:
  - name: Used for the label of drop down
  - data: values of the drop down list
  - handleOnChange: event being called for onChange.

## Utilies and Styling

### /api.js
Utility to handle all fetch call from the API.

### /App.css
Containter for all the classes for styling the application

### -----

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
