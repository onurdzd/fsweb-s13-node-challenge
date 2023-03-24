// eylemlerle ilgili ara katman yazılımları yazın
const Action = require("./actions-model");

const checkId = async (req, res, next) => {
  const id = req.params.id;
  const action = await Action.get(id);

  if (!action) {
    res.status(404).json({ message: "Verilen idli action bulunamadı" });
  } else {
    next();
  }
};

const checkBody = (req, res, next) => {
  const body = req.body;
  if (
    !body.description || body.description.length>120 ||
    !body.notes ||
    !body.project_id
  ) {
    res.status(400).json({ message: "Eksik bilgi girildi" });
  } else {
    next();
  }
};

const checkProjectId = async (req, res, next) => {
  const projectId =req.body["project_id"];
  const actions = await Action.get();

  if (actions.some((item) => item.id == projectId)) {
    next();
  } else {
    res.status(404).json({ message: "Girdiğin proje id si bulunamadı" });
  }
};

module.exports = {
  checkId,
  checkBody,
  checkProjectId,
};
