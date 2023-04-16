# How to run

#### [Fullstack = Backend + Frontend]

NOTES: Inside `frontend/` directory contains all things _sveltekit_ while `backend/` contains the backend stuff like _express_

**Step 1:** Navigate to the `backend/` directory then install the `dependencies` and `devDependencies`, same goes with the `frontend/` directory

```nodejs
npm install
```

**Step 2:** First build the frontend go to the `frontend/` then just do

```nodejs
npm run build
// alternatively you can do
vite build
```

**Step 3:** Next simply go to `backend/` to start the whole application (assuming that a `frontend/build/` directory exists)

```nodejs
npm run start
// alternatively you can do
node index.js
```

#### [Only Frontend]

Just do `npm run dev` inside `frontend/` and the application will start (might cause errors cause certain requests might not work)