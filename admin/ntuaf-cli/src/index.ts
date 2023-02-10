#! /usr/bin/env node
import { Socket } from "net";
import { assert } from "console";
import { Command } from "commander";
import { insertMember, insertArtWork, insertEvent } from "./utils/insertSample";
import {deleteCollection} from "./utils/deleteSample";
import { askMode, askEnv, askAction, MODE_TYPE } from "./utils/prompts";
import {transformMembers, transformRecommendEvents, transformDayEvents} from "./utils/transformData/index"
const figlet = require("figlet");

const program = new Command();
console.log(figlet.textSync("NTUAF CLI"));

program
  .version("1.0.0")
  .description("An CLI interface for ntuaf")
  .option("-m, --mode  [value]", "直接執行某行為")
  .option("-d, --dev", "是否連接模擬器")
  .parse(process.argv);

const options = program.opts();
// console.log("helo")
// enum test{
//   "A",
//   "B",
//   "C"
// }
// console.log(test)
// const blockTypeList = Object.keys(test).map((key) => test[key as keyof typeof test])
// const values = Object.values(test).filter((v) => isNaN(Number(v)));

// console.log(blockTypeList)
// console.log(values)
(async function () {
  // 確認測試模式連線本地模擬器
  if (options.dev) {
    console.log("connect to local enumerator");
    const isEnvSet = process.env.FIRESTORE_EMULATOR_HOST === "127.0.0.1:8080";
    assert(
      isEnvSet,
      "use export FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 in your terminal"
    );
    if (!isEnvSet) {
      return 1;
    }
    if (!(await isPortReachable(8080, { host: "127.0.0.1" }))) {
      console.error(
        "Should use 'yarn enumerate' to start a enumerate local for testing"
      );
      return 1;
    }
  }
  // 是否為允許的可自動化執行模式
  if (options.mode) {
    const allowModes = [MODE_TYPE.插入測試資料];
    if (!allowModes.includes(options.mode)) {
      console.log("不允許使用自動化指令行的參數");
      console.log("僅允許下列參數");
      allowModes.forEach((v, i) => {
        console.log(`${i + 1}. ${v}`);
      });
      return;
    }
  }
  const mode: MODE_TYPE = options.mode || (await askMode()).mode;
  
  switch (mode) {
    case MODE_TYPE.插入測試資料:{
      await insertMember()
      await insertArtWork()
      await insertEvent ()
		break;
    }
    
    case MODE_TYPE.刪除測試資料:{
		// const o = (await askEnv()).env;
		// console.log(o)
		await deleteCollection("Members")
    await deleteCollection("Events")
    await deleteCollection("ArtWorks")
    break;
    }
    case MODE_TYPE.refreshCache:{

    }
    default:{
      console.log("未選擇");
      break;
    }

  }
});

async function isPortReachable(
  port: number,
  { host, timeout = 1000 }: { host: string; timeout?: number }
) {
  const promise = new Promise((resolve, reject) => {
    const socket = new Socket();

    const onError = () => {
      socket.destroy();
      reject(1);
    };

    socket.setTimeout(timeout);
    socket.once("error", onError);
    socket.once("timeout", onError);

    socket.connect(port, host, () => {
      socket.end();
      resolve(0);
    });
  });

  try {
    await promise;
    return true;
  } catch {
    return false;
  }
}
