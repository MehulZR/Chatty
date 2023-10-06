# Installation

Install the dependencies of the project.

```bash
npm i
```

# Environment Variables

These env variables need to be defined for proper functioning of the app.

- JWT_PRIVATE_KEY
- JWT_PUBLIC_KEY
- ORIGIN
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_CALLBACK_URL
- PUSHER_APP_ID
- PUSHER_APP_KEY
- PUSHER_APP_SECRET
- PUSHER_APP_CLUSTER
- DATABASE_NAME

### Note:

> Currently NextJS is using old version of dotenv parse so multiline env variables are having some issue. Store the Multiline variables in single line using **\n**.

> MongoDB database must be implemented

# Getting Started

- To spin up the project in development mode.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
