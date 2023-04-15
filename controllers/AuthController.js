// const authService = require('../services/AuthService');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    if (!req.body.username) {
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing Username",
            data: req.body
        })
        return;
    }
    if (!req.body.password) {
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing Password",
            data: req.body
        })
        return;
    }
    const salt = bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password)
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPassword
    }

    try {
        res.json({
            success: true,
            error: false,
            message: "Successful Registration!",
            data: req.body
        })
    } catch (err) {

    }
    res.json();
    // const schedules = await scheduleService.getEntireSchedule();
    // res.json({ data: schedules, status: "success" });
}

exports.login = async (req, res) => {
  try {
    // const schedule = await scheduleService.createSchedule(req.body);
    // res.json({ data: schedule, status: "success" });
  } catch (err) {
    // res.status(500).json({ error: err.message });
  }
};
