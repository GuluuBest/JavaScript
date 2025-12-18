const express = require("express");
const auth = require("../Middleware/authMiddleware");
const role = require("../Middleware/roleMiddleware");
const validate = require("../Middleware/activityvalidation");

const router = express.Router();
const activities = [];

// GET ACTIVITIES
router.get("/", auth, (req, res) => {
  res.json(activities);
});

// CREATE ACTIVITY (ADMIN)
router.post("/", auth, role("admin"), validate, (req, res) => {
  const activity = {
    id: activities.length + 1,
    ...req.body,
    participants: [],
  };

  activities.push(activity);
  res.json({ message: "Kegiatan berhasil ditambahkan", activity });
});

// UPDATE ACTIVITY (ADMIN)
router.put("/:id", auth, role("admin"), (req, res) => {
  const activity = activities.find((a) => a.id == req.params.id);

  if (!activity) {
    return res.status(404).json({ message: "Kegiatan tidak ditemukan" });
  }

  Object.assign(activity, req.body);
  res.json({ message: "Kegiatan diperbarui", activity });
});

// JOIN ACTIVITY (MAHASISWA)
router.post("/:id/join", auth, role("mahasiswa"), (req, res) => {
  const activity = activities.find((a) => a.id == req.params.id);

  if (!activity) {
    return res.status(404).json({ message: "Kegiatan tidak ditemukan" });
  }

  activity.participants.push(req.user.id);
  res.json({ message: "Berhasil join kegiatan" });
});

module.exports = router;
