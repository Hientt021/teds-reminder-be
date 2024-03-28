export const getNewUserId = async (model, length = 6) => {
  let userId = "";
  while (!userId) {
    const id = Math.random()
      .toString(36)
      .substring(2, length + 2);
    const alreadyExist = await model.findOne({ id });
    if (alreadyExist) userId = "";
    else userId = id;
  }

  return userId;
};
