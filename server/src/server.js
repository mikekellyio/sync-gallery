var express = require("express");
var app = express();
var expressWs = require("express-ws")(app);
const WebSocket = require("ws");

const wss = expressWs.getWss();

const Observer = require("./services/observer");
var observer = new Observer();

const folder = process.env.WATCH || "tmp";

var fs = require("fs");
const util = require("util");

const readdir = util.promisify(fs.readdir);
async function fileList(directoryPath) {
  let files;
  try {
    files = await readdir(directoryPath);
  } catch (err) {
    console.log(err);
  }
  return files.map(file => `images/${file}`);
}

observer.on("file-added", msg => {
  // print error message to console
  console.log(msg);

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(msg));
    }
  });
});

observer.watchFolder(folder);

app.get("/", function(req, res, next) {
  console.log("get route", req.testing);
  res.end();
});

app.get("/images", async (req, res) => {
  let files = await fileList(folder);

  res.type("json");
  res.send(JSON.stringify(files));
});

app.ws("/", function(ws, req) {
  ws.on("message", message => {
    //log the received message and send it back to the client
    console.log("received: %s", message);
    ws.send(JSON.stringify({ type: "echo", message }));
  });

  //send immediatly a feedback to the incoming connection
  ws.send(JSON.stringify({ type: "echo" }));
});

app.use("/images", express.static(folder));

app.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${process.env.PORT || 8999} :)`);
});
