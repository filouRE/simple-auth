import { getUser, createUser, checkUserData } from "./users";
import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

export const app = new Elysia()
  .use(
    cors({
      origin: "localhost:5173",
    })
  )
  .post("/auth/signin", ({ body }) => getUser(body.username, body.password), {
    body: t.Object({
      username: t.String(),
      password: t.String(),
    }),
  })
  .post(
    "/auth/signup",
    ({ body }) => createUser(body.username, body.email, body.password),
    {
      body: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .post(
    "/auth/checkid",
    ({ body }) => checkUserData(body.username, body.uuid),
    {
      body: t.Object({
        username: t.String(),
        uuid: t.String(),
      }),
    }
  )
  .onError(({ code, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;

      return "Not Found :(";
    }
  })
  .listen(3000);
