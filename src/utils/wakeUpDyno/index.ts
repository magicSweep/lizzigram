import { sendHttpsReq } from "./https";
import https from "https";
import { getMoscowHours } from "./moscowTime";

export let timeoutId: NodeJS.Timeout;

export const initWakeUpDyno = (options: https.RequestOptions) => {
  const hours = getMoscowHours();

  console.log("MOSCOW HOUR", hours);

  sendHttpsReq(options)
    .then((res) => console.log(`PING SUCCESS`))
    .catch((err) => console.log(`PING ERROR - ${err.message}.`));
};

export const wakeUpDyno = (
  options: https.RequestOptions,
  intervalMinutes = 25
) => {
  const milliseconds = 1000 * 60 * intervalMinutes;
  timeoutId = setTimeout(() => {
    try {
      //console.log(`setTimeout called.`);

      const hours = getMoscowHours();

      if (hours < 1 && hours > 8) {
        // HTTP GET request to the dyno's url
        sendHttpsReq(options).then(({ response }) =>
          console.log(
            `Fetching ${options.hostname} - status - ${response.statusCode}.`
          )
        );
      }
    } catch (err) {
      // catch fetch errors
      console.log(`Error fetching ${options.hostname}: ${err.message} 
            Will try again in ${intervalMinutes} minutes...`);
    } finally {
      wakeUpDyno(options, intervalMinutes);

      /* try {
                callback(); // execute callback, if passed
            }
            catch (e) { // catch callback error
                callback ? console.log("Callback failed: ", e.message) : null;
            }
            finally {
                // do it all again
                return wakeUpDyno(url, intervalMinutes, callback);
            } */
    }
  }, milliseconds);
};
