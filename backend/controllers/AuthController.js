import {createNewUser, findUserByEmail, findUserById} from '../services/AuthService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    if (!req.body.email) {
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing Email",
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
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    }
    try {
        let newRegister = await createNewUser(newUser);
        if (newRegister.isAccountExisting) {
            res.json({ 
                success: false, 
                error: true, 
                message: "Account already exists! Email is already registered", 
            })
        } else {
            res.json({ 
                success: true, 
                error: false, 
                message: "Successful Registration!", 
                data: {
                    acknowledged: true,
                    id: newRegister._id
                }
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: true,
            message: "Error with DB Registration",
            data: req.body
        })
    }
}

export const login = async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", true);
    if (!req.body.email) {
        res.status(500).json({
            success: false,
            error: true,
            message: "Missing Email",
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
    let user = await findUserByEmail(req.body.email);
    // User does not exist
    if (!user) {
        res.status(404).json({
            success: false,
            error: true,
            message: "User Not Found!",
            data: req.body
        })
        return;
    }

    // Invalid credentials
    if (!await bcrypt.compare(req.body.password, user.password)) {
        res.status(400).json({
            success: false,
            error: true,
            message: "Invalid Credentials!",
            data: req.body
        })
        return;
    }

    // Create token
    const token = jwt.sign({_id: user._id}, process.env.SECRET, { expiresIn: '24h'});
    res.cookie('token', token, {httpOnly: true, maxAge: (((24 * 60) * 60) * 1000)});

    res.send({
        success: true,
        error: false,
        message: "Login Successful!",
        data: null
    })

  } catch (err) {
    res.status(500).json({
        success: false,
        error: true,
        message: "Error with DB Login",
        data: req.body
    })
  }
};

export const userStatus = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", true);
    const cookie = req.cookies['token'];
    try {
        const claims = jwt.verify(cookie, process.env.SECRET);
        if (!claims) {
            res.status(401).json({
                success: false,
                error: true,
                message: "No Auth!",
                data: null
            })
        }
        const user = await findUserById(claims._id);
        // If it is found, simply send in the id along with the details excluding the pwd
        res.json({
            success: true, 
            error: false, 
            message: "Authorized", 
            data: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: true,
            message: "JWT Error",
            data: req.body
        })
    }
}


export const logout = (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", true);
    res.cookie('token', {httpOnly: true, maxAge: 0});
    res.send({
        success: true,
        error: false,
        message: "Logout Successful!",
        data: null
    })
}
