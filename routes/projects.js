const router = require("express").Router();
const Project = require("../models/Projects");

//POST ANY PROJECT
router.post('/', async (req, res) => {
  const newProject = new Project({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    techStack: req.body.techStack,
    github: req.body.github,
    liveLinks: req.body.liveLinks
  });
  try {
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//GET SINGLE PROJECT
router.get('/:id', async (req, res) => {
  try {
    const singleproduct = await Project.findById(req.params.id);
    res.status(200).json(singleproduct)
  } catch (error) {
    res.status(500).json(error.message);
  }
});


//GET ALL PROJECTS
router.get('/', async (req, res) => {
  const allprojects = await Project.find();
  try {
    res.status(201).json(allprojects)
  } catch (error) {
    res.status(500).json(error.message);
  }

})

//DELETE ANY PROJECTS
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.status(201).json('Project deleted successfully')
  } catch (error) {
    res.status(500).json(error.message)
  }

})

module.exports = router;
