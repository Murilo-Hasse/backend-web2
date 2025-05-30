import express from "express";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import * as routes from "./routes/routes.js"

const app = express();

app.use(express.json());
app.use('/api', routes);

// Add these after your routes
app.use(notFound);
app.use(errorHandler);

export default app;
