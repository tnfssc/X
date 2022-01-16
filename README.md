# X

## Research

- We experimented with various technologies available to us.
- Starting with web technologies such as React, we tried out many available SDKs and services.
- Using React and Google maps, we had partial success in creating a navigation app.
- We realized that if we continue down this path, it would take a lot of time and effort to create the app.
- Flutter was an interesting choice. It was a great tool to use for creating cross platform mobile apps.
- But we quickly realized that there were no libraries available for our particular needs.
- We planned on creating our own library, but looking at the complexity, we came to a conclusion that it wasn't the best idea.
- Finally, after failing to create a library, we decided to create a native app.
- We plan to develop an Android native app using Kotlin and Android Platform.

## Design

### The Application

- Design a simple, intuitive, and easy to use app.
- First, focus on functionality.
- Once the app is fully functional, focus on design and animations.
- The app is initially going to be a simple, single screen app.
- That screen will be the main screen containing a map.
- The map will be centered on the user's current location.
- The user can lookup directions to a destination and start navigating.
- The path may contain dangerous roads and spots.
- We detect them ahead of time and show a warning.
- When the user is approaching the dangerous spot, we announce a warning like "Please slow down. Danger ahead!".
- We may also incorporate a button to show an alternate route avoiding the danger altogether.

### The Service

- The backend should be able to handle all the data and logic.
- It must be fast, performant but distributed.
- It is best to use a microservices architecture because of parallel and independent development style.
- Here is a representational (tentative) architecture of the backend.

![Architecture](https://i.postimg.cc/43LbsXQv/arch.png)

## Development

- Right now, the backend is mostly straight forward.
- The frontend is a bit more complex.
- Android development is a bit more involved than web development.
- Focussing completely on the Android app is the current plan.
- Once the app is taking its intended shape, resources can be allocated to the backend and other parts of the service.
- Developing other screens such as the landing screen and the settings screen can be done now.
- Thus, the MVP is complete.

## Technologies and Tools (tentative)

- Android using Kotlin and Android Platform
- Mapbox SDK for maps and navigation services
- Supabase or Firebase for authentication
- React Admin app
- Node.JS based backend services
- PostgreSQL for database
- Linux based OS (Ubuntu, Arch etc)
- IntelliJ based IDEs (Android Studio, IntelliJ IDEA, WebStorm etc)
- Visual Studio Code based editors (CodeOSS, VSCodium etc)
- Android based smartphones for testing
