
# BizScout Fullstack Application
[![Frontend CI](https://github.com/choyan/BizScout-fullstack/actions/workflows/frontend.yml/badge.svg?branch=main)](https://github.com/choyan/BizScout-fullstack/actions/workflows/frontend.yml)

**Live Deployment:** https://biz-scout-fullstack.vercel.app/

## Architecture overview
The BizScout application is built as a modern full-stack project, leveraging the following architectural structure:

### Backend
The backend is built using NestJS, a progressive Node.js framework for building scalable server-side applications. The backend is organized into the following key components:

- **Modules:** Encapsulate the functionality of the application, such as user-activity.
- **Services:** Contain the business logic, including integrations like Prisma and Supabase.

- **Controllers:** Handle HTTP requests and responses.

- **Gateways:** Implement WebSocket gateways for real-time communication.

- **Common Utilities:** Shared functionalities, such as pagination logic or faker services for mock data generation.

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
The current front-end is deployed on Vercel and the backend is deployed on DigitalOcean droplet.

So the `front-end` can be easily deployed on Vercel using the default Next.js configuration.

The backend can be deployed on a DigitalOcean Droplet or AWS EC2.

We are using PM2 here, to manage the automate the process management.

In the backend server, we can built the app using `npm run build` and start the PM2 process using `pm2 start dist/src/main.js`.

### Important Note:
The current deployment setup does not have SSL configured for the backend. As a result, when visiting the deployed site on Vercel, you may need to manually allow "Insecure content" in your browser's site settings to enable communication between the front-end and back-end.

## Testing & CI Pipeline
To ensure code quality, reliability, and maintainability, the project includes plans for implementing a robust Testing and Continuous Integration (CI) pipeline.

### Backend
The backend uses NestJS, which comes with built-in support for testing. The testing strategy for the backend includes the testing of `createUserActivities` method of `user-activity` module.

### Frontend
The frontend uses Vitest for testing. The testing strategy includes `msw` for api mocking.
Three components are being tested for now.


## Future Improvements

At present, types are being declared multiple times, and there is no mechanism for sharing Prisma-generated types between the back-end and front-end. Implementing a shared type system across the codebase would greatly improve maintainability and reduce redundancy.

The dashboard currently displays some statistics as static numbers. Ideally, some of these numbers could be dynamically generated from the backend data to reflect real-time insights.

Test coverage is incomplete, especially on the front-end. Not all components and modules have been thoroughly tested, and expanding the coverage to include a larger portion of the codebase would enhance reliability.

The existing tests are fairly generic, and more thoughtful, scenario-specific tests could provide better validation for critical workflows.

Add tests for handling error scenarios, such as API failures or invalid user inputs, and validate that appropriate fallback mechanisms (like error messages or retries) are in place.

While deployment is partially addressed, fully automating the deployment process for both the front-end and back-end would streamline the workflow. This could involve integrating tools like Terraform / Pulumi, Docker, or AWS CDK for infrastructure management.

Finally, deploying the application on an SSL-enabled server would resolve the issue of insecure content warnings and improve overall security for users.
