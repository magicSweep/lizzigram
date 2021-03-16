export const get = jest.fn((url: string, headers?: any) => {
  //if we use FormData, it add headers by themselve

  const data = {
    status: "success",
    data: {
      hello: "bye",
    },
  };

  return Promise.resolve({
    json: () => Promise.resolve(data),
  });
});

export const post = jest.fn((url: string, data: FormData, headers?: any) => {
  //if we use FormData, it add headers by themselve
  const cdata = {
    status: "success",
    data: {},
  };

  return Promise.resolve({
    json: () => Promise.resolve(cdata),
  });
});
