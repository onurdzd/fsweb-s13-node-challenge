// eylemlerle ilgili ara katman yazılımları yazın
const Action = require("./actions-model");

const checkId = async (req, res, next) => {
  const id = req.params.id;
  const action = await Action.get(id);

  if (!action) {
    res.status(404).json({ message: "Verilen idli action bulunamadı" });
  } else {
    req.existAction=action
    next();
  }
};

const checkBody = (req, res, next) => {
  const body = req.body;
  let validDescription=body.description && body.description.length<=128
  if (
    !validDescription ||
    !body.notes ||
    !body.project_id
  ) {
    res.status(400).json({ message: "Eksik bilgi girildi" });
  } else {
    req.checkedBody={description:body.description,notes:body.notes,project_id:body.project_id}
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
