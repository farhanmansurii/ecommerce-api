const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  techStack: { type: Array, required: true },
  github: { type: String, required: true },
  liveLinks: { type: String, required: true },
});

module.exports = mongoose.model('Project', ProjectSchema);
