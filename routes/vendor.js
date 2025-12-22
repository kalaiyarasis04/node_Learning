const express = require(`express`);
const Vendor = require('../models/vendor');
const vendorRouter = express.Router();
const bcrypt = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);

vendorRouter.post(`/api/vendor/signup`, async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const existingEmail = await Vendor.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ msg: "Vendor with same email already exist" });
        } else {
            //Generate a salt with a cost factor of 10
            const salt = await bcrypt.genSalt(10);
            //hash the password using the generated salt
            const hashedPassword = await bcrypt.hash(password, salt);
            let vendor = new Vendor({ fullName, email, password: hashedPassword });
            vendor = await vendor.save();
            res.json({ vendor });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


//signin api endpoint

vendorRouter.post('/api/vendor/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const findVendor = await Vendor.findOne({ email });
        if (!findVendor) {
            return res.status(400).json({ msg: "Vendor not found with this email" })
        } else {
            const isMatch = await bcrypt.compare(password, findVendor.password);
            if (!isMatch) {
                return res.status(400).json({ msg: `Incorrect Password` });
            } else {
                const authorization = jwt.sign({ id: findVendor._id }, "passwordKey");

                //remove sensitive information
                const { password, ...vendorWithoutPassword } = findVendor._doc;

                //send the responses
                res.json({ authorization, vendor: vendorWithoutPassword });
            }
        }

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

module.exports = vendorRouter;