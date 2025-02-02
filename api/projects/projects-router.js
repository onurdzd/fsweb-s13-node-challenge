// "project" routerını buraya yazın!
const express = require("express");
const router = express.Router();
const Project = require("./projects-model");
const mw = require("./projects-middleware");

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.get();
    if (projects.length > 0) {
      res.status(201).json(projects);
    } else {
      res.status(201).send([]);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkId, (req, res, next) => {
  try {
    const id=req.params.id
    const project = req.project
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.bodyCheck, async (req, res, next) => {
  try {
    let newProject = await Project.insert(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", mw.checkId, mw.bodyCheck, async (req, res, next) => {
  try {
    let id = req.params.id;
    let updatedProject = await Project.update(id,req.bodyCheckPayload);
    res.status(201).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", mw.checkId, async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedUser = await Project.get(id);
    await Project.remove(id);
    res
      .status(201)
      .json({
        silinen_user: deletedUser,
        message: "Kullanıcı başarıyla silindi",
      });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", mw.checkId, async (req, res, next) => {
  try {
    const id=req.params.id
    const projectAction = await Project.getProjectActions(id);
    res.status(201).json(projectAction);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
