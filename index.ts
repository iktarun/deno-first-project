// @ts-ignore
import { serve } from "https://deno.land/std/http/server.ts";
// @ts-ignore
import { config } from "https://deno.land/x/dotenv/mod.ts";
// @ts-ignore
import { mapStory } from "./stories.ts";

const url = "http://hn.algolia.com/api/v1/search?query=javascript";

const server = serve({
  port: parseInt(config()["PORT"])
});
// @ts-ignore
for await (const req of server) {
  // @ts-ignore
  const result = await fetch(url).then((result) => result.json());
  const stories = result.hits.map(mapStory);
  req.respond({ body: JSON.stringify(stories) });
}
