const axios = {
  get: jest.fn().mockResolvedValue({ data: {} }),
  create: () => axios,
  defaults: {
    adapter: {},
  },
};

export default axios;
