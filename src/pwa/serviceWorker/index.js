import { registerRoute } from "workbox-routing/registerRoute";
import { StaleWhileRevalidate } from "workbox-strategies/StaleWhileRevalidate";
import { CacheFirst } from "workbox-strategies/CacheFirst";
import { ExpirationPlugin } from "workbox-expiration/ExpirationPlugin";

//self.__WB_MANIFEST;

precacheAndRoute(self.__WB_MANIFEST);

// GOOGLE AUTH - FIRST SEND OPTION METHOD
registerRoute(/(\/|w\.)googleapis\.com/, async (args) => {
  const response = await fetch(args.event.request);

  // if method option - just return response

  // else - save user to indexedDb

  return response;
});

// FIRESTORE
registerRoute(/firestore\.googleapis\.com/, async (args) => {
  const response = await fetch(args.event.request);

  // save photo info to indexedDb

  return response;
});

// CLOUDINARY PHOTOS
registerRoute(
  /res\.cloudinary\.com/,
  new CacheFirst({
    cacheName: "cloudinary-photo",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30 * 12,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

/* registerRoute(
  /.*(?:googleapis|gstatic)\.com.*$/,
  new StaleWhileRevalidate({
    cacheName: "google-fonts",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

registerRoute(
  "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
  new StaleWhileRevalidate({
    cacheName: "material-css",
  })
);

registerRoute(
  /.*(?:firebasestorage\.googleapis)\.com.*$/,
  new StaleWhileRevalidate({
    cacheName: "post-images",
  })
);

// SAVE OUR API JSON DATA IN TO INDEXED DB
registerRoute("https://our-api.com/posts", async (args) => {
  const response = await fetch(args.event.request);

  const cache = await caches.open(cacheName);

  //trimCache(cacheName, 3);

  // TODO: save to indexedDb
  cache.put(requestUrl, response.clone());

  return response;
});

// IF WE REQUEST TO SOME HTML FILE
// IF IT DOES NOT EXISTS WE RETURN FALLBACK PAGE
registerRoute(
  (route) => {
    return route.event.request.headers.get("accept").includes("text/html");
  },
  async (args) => {
    const cachedResponse = await caches.match(args.event.request);

    if (cachedResponse) {
      return cachedResponse;
    } else {
      try {
        const response = await fetch(args.event.request);

        const cache = await caches.open("dynamic");

        //trimCache(cacheName, 3);

        cache.put(args.event.request.url, response.clone());

        return response;
      } catch (err) {
        console.log("Some error on dynamic cache", err);

        return caches.match("/offline.html");
      }
    }
  }
);
 */
