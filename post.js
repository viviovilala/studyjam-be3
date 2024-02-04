const fs = require("fs");

const get = () => {
  const posts = fs.readFileSync("database/posts.json");

  return JSON.parse(posts);
};

const getById = (id) => {
  const posts = get();

  return posts.find((post) => post.id == id);
};

const savePosts = (posts) => {
  fs.writeFileSync("database/posts.json", JSON.stringify(posts));
};

const save = (post) => {
  const posts = get();

  posts.push(post);

  savePosts(posts);
};

const update = (id, post) => {
  const posts = get();
  const index = posts.findIndex((post) => post.id == id);

  if (index == -1) {
    return;
  }

  const oldPost = posts[index];

  posts[index] = {
    id: oldPost.id,
    ...post,
  };

  savePosts(posts);
};

const destroy = (id) => {
  const posts = get();
  const index = posts.findIndex((post) => post.id == id);

  posts.splice(index, 1);

  savePosts(posts);
};

module.exports = {
  get,
  getById,
  save,
  update,
  destroy,
};
