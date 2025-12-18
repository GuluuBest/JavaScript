module.exports = (req, res, next) => {
  const { title, date, description } = req.body;

  if (!title || !date || !description) {
    return res.status(400).json({
      message: "Data kegiatan tidak lengkap",
    });
  }

  next();
};
