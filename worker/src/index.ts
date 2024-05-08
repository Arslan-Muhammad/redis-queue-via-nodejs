import { createClient } from "redis";

const client = createClient();

async function main() {
  await client.connect();

  while (1) {
    const response = await client.brPop("Submissions", 0);
    // @ts-ignore
    const element = response.element;
    const { problemId } = JSON.parse(element);
    console.log(problemId);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Processed users submissions");

    client.publish(
      "problem_done",
      JSON.stringify({ problemId, status: "TLE" })
    );
  }
}

main();
