import app from "./app.js";
import { sequelize } from "./models/index.js";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync(); // conecta e sincroniza com o banco
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
})();
