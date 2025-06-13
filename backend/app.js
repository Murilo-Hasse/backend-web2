import express from "express";
import morgan from "morgan";
import session from "express-session";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { engine } from "express-handlebars";
import routes from "./routes/index.js";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configuração do Handlebars
app.engine(
  "handlebars",
  engine({
    extname: ".handlebars",
    defaultLayout: "main",
    layoutsDir: join(__dirname, "views", "layout"),
    partialsDir: join(__dirname, "views", "partials"),
  })
);
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));

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

// Torna a sessão disponível para as views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.userType = req.session.userType;
  // Se user.name existe e user.nome não, crie user.nome para compatibilidade com a view
  if (res.locals.user && res.locals.user.name && !res.locals.user.nome) {
    res.locals.user.nome = res.locals.user.name;
  }
  next();
});

// Rotas
app.get("/", (req, res) => {
  if (req.session.user) {
    if (req.session.userType === "candidate") {
      return res.redirect("/candidate/dashboard");
    } else if (req.session.userType === "recruiter") {
      return res.redirect("/recruiter/dashboard");
    }
    res.render("home", { title: "Bem-vindo(a) ao sistema!" });
  } else {
    res.render("auth/main", { title: "Login no sistema" });
  }
});

app.use("/", routes);

// Middleware de tratamento de erros
// Este middleware é o que está retornando "Something broke!"
app.use((err, req, res, next) => {
  console.error("ERRO CAPTURADO PELO MIDDLEWARE:", err.stack); // Log mais detalhado
  res.status(500).send("Something broke! Check server logs for details.");
});

// Apenas exporta a instância do Express app
export default app;
