import dotenv from "dotenv";
import createChannel from "./wrappers/createChannel.js";
import getChannels from "./wrappers/getChannels.js";
import { sleep } from "./helpers/utils.js";
import createServer from "./wrappers/createServer.js";
import input from "input";

console.log('\x1B[32mDeveloper by antilag')
console.warn("\x1B[33mDiscord: antilag#2006")
console.warn("\x1B[33mgood day lol.")
await sleep(400)
console.warn('')
console.warn('')
console.warn('\x1B[33m[+] antilag \x1B[33mserver copy opens!');
console.warn('');
console.warn("\x1B[33m[+]%25");
await sleep(200)
console.warn('');
console.warn("\x1B[33m[+]%50");
await sleep(150)
console.warn('');
console.warn("\x1B[33m[+]%75");
await sleep(150)
console.warn('');
console.warn("\x1B[33m[+]%100");
await sleep(150)
console.warn('');
dotenv.config();

const main = async () => {
  let originServerId = await input.text("\x1B[31m[+] The Server ID you will copy:");
  const createdServerId = await createServer(originServerId);
  console.log("Server Created");
  const channels = await getChannels(originServerId);
  let parentChannels = channels
    .filter((channel) => channel.type === 4)
    .map((parent) => [parent]);
  parentChannels = [...parentChannels].sort((a, b) => a.position - b.position);

  parentChannels.map((parent) =>
    channels.forEach(
      (channel) => channel.parent_id === parent[0].id && parent.push(channel)
    )
  );
  const parentsAndChannels = parentChannels;

  for (let group of parentsAndChannels) {
    if (group.length > 1) {
      let parentId = null;
      for (let [index, item] of group.entries()) {
        let res = await createChannel(
          createdServerId,
          parentId,
          item.type,
          item.name,
          item.permission_overwrites
        );
        if (index === 0) parentId = res.id;
        console.log(`\x1B[31m[+] Channel created ${item.name}`);
      }
    } else {
      await createChannel(
        createdServerId,
        group?.parent_id,
        group.type,
        group.name,
        group.permission_overwrites
      );
      console.log(`\x1B[32m[+] Role created ${group.name}`);
    }

    await sleep(2000);
  }
};

main();
