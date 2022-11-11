import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
const client = sanityClient({
  projectId: "dj14vfg3",
  dataset: "production",
  apiVersion: "2022-11-11", // use current UTC date - see "specifying API version"!
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
export default client;
