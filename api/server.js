const express = require("express");
const server = express();

server.use(express.json());

const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

server.use((err, req, res) => {
  let status = err.status || 500;
  res
    .status(status)
    .json({
      customMessage: "Bir hata oluştu .server jsden hatayı göneriyor",
      message: err.message,
    });
});

module.exports = server;
