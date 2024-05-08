import { createClient } from "redis";

const client = createClient();

async function main() {
  await client.connect();
  client.subscribe("problem_done", function (message) {
    console.log(message);
  });
}

main();
