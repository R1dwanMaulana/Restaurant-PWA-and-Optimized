import 'regenerator-runtime';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing/registerRoute';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { skipWaiting, clientsClaim, setCacheNameDetails } from 'workbox-core';
import CONFIG from './globals/config';

skipWaiting();
clientsClaim();

setCacheNameDetails({
  prefix: CONFIG.CACHE_PREFIX_NAME,
});

precacheAndRoute(self.__WB_MANIFEST, {
  ignoreURLParametersMatching: [/.*/],
  plugins: [
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

registerRoute(
  new RegExp('https://restaurant-api.dicoding.dev/'),
  new StaleWhileRevalidate({
    cacheName: 'dicoding-restaurant-api',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
        maxEntries: 50,
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate(),
);

registerRoute(
  /^https:\/\/kit\.fontawesome\.com\//,
  new StaleWhileRevalidate({
    cacheName: 'javsacript-font-awesome',
  }),
);

registerRoute(
  new RegExp('https://ka-f.fontawesome.com/'),
  new StaleWhileRevalidate({
    cacheName: 'icon-font-awesome',
  }),
);

cleanupOutdatedCaches();
