
# BizScout Fullstack Application
![Vercel Deploy](https://deploy-badge.vercel.app/vercel/biz-scout-fullstack)

## Architecture overview
The BizScout application is built as a modern full-stack project, leveraging the following architectural structure:

### Backend
The backend is built using NestJS, a progressive Node.js framework for building scalable server-side applications. The backend is organized into the following key components:

- Modules: Encapsulate the functionality of the application, such as user-activity.

- Services: Contain the business logic, including integrations like Prisma and Supabase.

- Controllers: Handle HTTP requests and responses.

- Gateways: Implement WebSocket gateways for real-time communication.

- Common Utilities: Shared functionalities, such as pagination logic or faker services for mock data generation.

Data persistence is managed using Prisma ORM, with schema and migration files located under the prisma directory.


### Frontend
The frontend is a Next.js application using the App Router. The structure follows a modular approach, focusing on reusability and scalability:

- **App Directory:** Contains the global layout, CSS, and page definitions.
- **UI Components:** Reusable components like data-table and spinner are designed to provide a consistent user experience.
- **Feature-Specific Components:** Organized within directories like features/home, enabling better separation of concerns.
- **Hooks and Utilities:** Custom hooks and utility functions are centralized under the hooks and lib directories for easier access.
- **WebSocket Integration:** The WebSocket connection is implemented in socket-initializer.tsx to enable real-time data updates.

### Communication
The backend and frontend communicate via REST APIs and WebSocket connections. WebSocket support is powered by socket.io-client on the frontend and platform-socket.io on the backend.

### Database
The application uses Supabase as the backend service for database management and real-time features, making it a seamless fit with Prisma ORM for data modeling and migrations.



## Choice of technologies

I utilized Next.js and NestJS in this project because they form the core frameworks powering BizScout.

The choice to use Supabase was driven by its presence in BizScout's existing setup, allowing me to familiarize myself with the current tech stack.

For styling, I opted for TailwindCSS due to its lightweight footprint and its integration into BizScout's current system.

On the front-end, I implemented WebSocket functionality using socket.io-client to align with the back-end's use of NestJS and its platform-socket.io for managing the WebSocket gateway.


## Installation



### Backend

The backend is a NestJS application.



Navigate to the `backend` folder and install the dependencies.



```bash

npm  install

```



Setup Supabase environmental variables in the `.env` file.



Initialize Prisma

```bash

npx  prisma  init

```



Start the development server

```bash

npm  run  start:dev

```



The backend server should be available at the `http://localhost:4000` port.



### Front-end

The front-end is a Next.js application with App router.



Navigate to the `front-end` folder and install the dependencies:

```bash

npm  install

```



Set the backend url at the `NEXT_PUBLIC_API_URL` property of the `.env` file.



Start the development server.

```bash

npm  run  dev

```

## Deployment

## Testing strategy

## Future Improvements

At the moment we are declaring types multiple times. There is no sharing of Prisma generated types with the front-end.

I would have loved to shared those types between the codebase.
