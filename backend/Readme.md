backend/
├── package.json
├── server.js                # Entry point of Express server
├── .env                     # Environment variables (Supabase keys, PORT)
├── supabaseClient.js        # Initialize Supabase client
├── config/
│    └── auth.js             # Auth middleware for protected routes
├── controllers/
│    ├── auth.controller.js  # Signup, login, admin auth, JWT logic
│    ├── semester.controller.js
│    ├── subject.controller.js
│    ├── chapter.controller.js
│    └── notes.controller.js
├── routes/
│    ├── auth.routes.js
│    ├── semester.routes.js
│    ├── subject.routes.js
│    ├── chapter.routes.js
│    └── notes.routes.js
├── models/                  # Optional: define schemas if you want TypeScript types or Mongoose-style objects
│    └── note.model.js
├── middleware/
│    └── authMiddleware.js   # Protect admin routes
├── utils/
│    └── upload.js           # File upload helper (PDF/images) for Supabase storage
└── seed/                    # Optional: seed initial data (semesters, subjects)
     └── seedData.js
