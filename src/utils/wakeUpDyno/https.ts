import { IncomingMessage } from "http";
import https from "https";
import http from "http";

let opts: https.RequestOptions = {
  hostname: "",
  //port: 80,
  path: "/",
  method: "GET",
  headers: {
    //'Content-Type': 'application/x-www-form-urlencoded',
    //'Content-Length': Buffer.byteLength(postData)
    //"Referer": "https://www.yandex.ru/",
    "User-Agent":
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:85.0) Gecko/20100101 Firefox/85.0",
  },
};

export const sendHttpsReq = (options: http.RequestOptions = undefined) => {
  if (options) {
    opts = { ...opts, ...options };
  }

  return new Promise<{ response: IncomingMessage; data: any }>(
    (resolve, reject) => {
      try {
        let data = "";

        const req = http.request(opts, (res) => {
          res.setEncoding("utf8");
          res.on("data", (chunk) => {
            //console.log(`BODY: ${chunk}`);
            data += chunk;
          });
          res.on("end", () => {
            //console.log("No more data in response.");
            resolve({
              response: res,
              data,
            });
          });
        });

        req.on("error", (err) => {
          //console.error(`Problem with request: ${err.message}`);
          reject(err);
        });

        // Write data to request body
        //req.write(postData);
        req.end();
      } catch (err) {
        reject(err);
      }
    }
  );
};
