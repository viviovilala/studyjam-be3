const Hapi = require("@hapi/hapi");
const { nanoid } = require("nanoid");
const post = require("./post");

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/posts",
    handler: (request, h) => {
      const posts = post.get();

      return h.response({
        statusCode: 200,
        message: "Posts found",
        data: posts,
      });
    },
  });

  server.route({
    method: "GET",
    path: "/posts/{id}",
    handler: (request, h) => {
      const result = post.getById(request.params.id);

      if (!result) {
        return h
          .response({
            statusCode: 404,
            error: "Not found",
            message: "Post Not Found",
          })
          .code(404);
      }

      return h.response({
        statusCode: 200,
        message: "Posts found",
        data: result,
      });
    },
  });

  server.route({
    method: "POST",
    path: "/posts",
    handler: (request, h) => {
      const id = nanoid();
      const title = request.payload.title;
      const content = request.payload.content;
      const author = request.payload.author;
      const date = request.payload.date;
      const tags = request.payload.tags;

      post.save({
        id,
        title,
        content,
        author,
        date,
        tags,
      });

      return h.response({
        statusCode: 201,
        message: "Post created",
      });
    },
  });

  server.route({
    method: "PUT",
    path: "/posts/{id}",
    handler: (request, h) => {
      const title = request.payload.title;
      const content = request.payload.content;
      const author = request.payload.author;
      const date = request.payload.date;
      const tags = request.payload.tags;

      post.update(request.params.id, {
        title,
        content,
        author,
        date,
        tags,
      });

      return h.response({
        statusCode: 200,
        message: "Post updated",
      });
    },
  });

  server.route({
    method: "DELETE",
    path: "/posts/{id}",
    handler: (request, h) => {
      post.destroy(request.params.id);

      return h.response({
        statusCode: 200,
        message: "Post deleted",
      });
    },
  });

  await server.start();

  console.log(`Server is running on http://${server.info.uri}`);
};

init();