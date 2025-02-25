import { Elysia } from "elysia";
import postsRoutes from "./routes/posts";

const app = new Elysia();

app
  .group('/api', (app) => app.use(postsRoutes));

(async () => {
  try {
    await app.listen(process.env.PORT || 3049);
    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();
