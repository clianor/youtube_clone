const applyMiddleware = (middlewareWrappers, router) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

const applyRouter = (routes, router) => {
  for (const route of routes) {
    const { method, path, handler } = route;
    router[method](path, handler);
  }
};

module.exports = {
  applyMiddleware,
  applyRouter,
};
