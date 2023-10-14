export const getHomeContent = async (req, res, next) => {
  try {
    // get recommended user's based on interests
    // get recommended public projects based on interests
    // ...more

    res
      .status(200)
      .json({ status: true, message: "exclusive content for specific user" });
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  try {
    // get users
    // get projects
    // ...more
  } catch (err) {
    next(err);
  }
};
