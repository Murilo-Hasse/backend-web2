import express from "express";
import morgan from "morgan";
import session from "express-session";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import routes from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use(morgan("dev"));
app.use(
  session({
    secret: "meuSegredo",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Rotas principais
app.get("/", (req, res) => {
  if (req.session.user) {
    return res.status(200).json({
      message: "Usuário autenticado",
      user: req.session.user,
      userType: req.session.userType,
    });
  }

  return res.status(200).json({
    message: "Bem-vindo à API! Faça login ou registre-se.",
  });
});

// Rotas da aplicação
app.use("/", routes);

// Middleware de erro
app.use((err, req, res, next) => {
  console.error("ERRO CAPTURADO PELO MIDDLEWARE:", err.stack);

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

export default app;
