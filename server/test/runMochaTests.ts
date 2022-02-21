import path from "path";
// import { CommandModule } from "yargs";
import Mocha from "mocha"
import connectToDb from "../../node/mongo/get-db-connection"
// import { runCLI } from "jest";
// import { startDocker } from "../../../node/dev/start-docker";
// import { setupDatabase } from "../../../node/dev/setup-database";
// import { TextEncoder } from 'util';
import fs from "fs";
// import fs from "fs";
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

// const mocha: CommandModule<{}, { path?: string }> = {
//   command: "mocha",
//   describe: "Run Mocha Tests",
//   builder: (yargs) =>
//     yargs.positional("path", {
//       type: "string",
//     }),
//   handler: async () => {
//     process.env.DB_CONNECTION = "defaultdb_test";
//     process.env.NODE_ENV = "test";
//     process.env.SERVER_PORT = "3037";
//     console.log('hit mocha tests');
//     // await startDocker();
//     // await setupDatabase(false);
//     var mocha = new Mocha()
//     const base = path.join(__dirname, "../");
//     const testDir = path.join(base, "./server/test/mochaTests")
//     fs.readdirSync(testDir).filter(function(file) {
//       return file.substring(file.length-3) === '.ts'
//     }).forEach(function(file) {
//       console.log("Added:", file)
//       mocha.addFile(
//         path.join(testDir, file)
//       )
//     }
//     )

//     connectToDb()
  
//     mocha.run(function(failures) {
//       process.exitCode = failures ? 1 : 0 
//     })

//   },
// };


// export default mocha;


process.env.DB_CONNECTION = "defaultdb_test";
process.env.NODE_ENV = "test";
process.env.SERVER_PORT = "3037";
console.log('hit mocha tests');
// await startDocker();
// await setupDatabase(false);
var mocha = new Mocha()
const base = path.join(__dirname, "../");
const testDir = path.join(base, "./test/mochaTests")
fs.readdirSync(testDir).filter(function(file) {
  return file.substring(file.length-3) === '.ts'
}).forEach(function(file) {
  console.log("Added:", file)
  mocha.addFile(
    path.join(testDir, file)
  )
}
)

connectToDb()

mocha.run(function(failures) {
  process.exitCode = failures ? 1 : 0 
  process.exit();
})

