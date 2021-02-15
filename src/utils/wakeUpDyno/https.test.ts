import { sendHttpsReq } from "./https";

describe("sendHttpsReq", () => {
  test("We send request to google", async () => {
    const { response, data } = await sendHttpsReq({
      hostname: "localhost",
      port: 3009,
      path: "/sleep",
    });
    //expect(data).toEqual("hello");
    expect(response.statusCode).toEqual(200);
    //expect(response.headers).toEqual(200);
  });
});
