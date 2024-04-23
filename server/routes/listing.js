const express = require("express");
const routers = express.Router();
const Listing = require("../model/listingschema");
const authmiddleware = require("../middleware/authmiddleware");
const multer = require("multer");
const Contactform = require("../model/contactschema");

const path = require("path");

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

routers.post("/", upload.single("image"), authmiddleware, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: 0, message: "No file uploaded" });
    }

    const newImage = new Listing({
      location: req.body.location,
      price_range: req.body.price_range,
      property_type: req.body.property_type,
      description: req.body.description,
      image: req.file.filename,
      amenities: req.body.amenities,
    });

    await newImage.save();

    res.json({
      success: 1,
      profile_url: `http://localhost:8004/profile/${req.file.filename}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: 0, message: "Internal server error" });
  }
});

routers.get("/", authmiddleware, async (req, res) => {
  try {
    const images = await Listing.find({});
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: 0, message: "Internal server error" });
  }
});

routers.put("/listing/:id", authmiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      location,
      price_range,
      property_type,
      description,
      images,
      amenities,
    } = req.body;
    const listiingupdate = await Listing.findByIdAndUpdate(
      id,
      { location, price_range, property_type, description, images, amenities },
      { new: true }
    );
    if (!listiingupdate) {
      res.status(404).json({ error: "not found" });
    }
    res.json(listiingupdate);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

routers.delete("/listing/:id", authmiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletelisting = await Listing.findByIdAndDelete(id);

    if (!deletelisting) {
      res.status(404).json({ error: "not found" });
    }

    res.json(deletelisting);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

routers.get("/listings", authmiddleware, async (req, res) => {
  try {
    // Extract filter criteria from query parameters
    const { location, min_price, max_price, property_type } = req.query;

    const filter = {};
    if (location) {
      filter.location = { $regex: new RegExp(location, "i") };
    }
    if (min_price && max_price) {
      filter.price_range = {
        $gte: parseInt(min_price),
        $lte: parseInt(max_price),
      };
    } else if (min_price) {
      filter.price_range = { $gte: parseInt(min_price) };
    } else if (max_price) {
      filter.price_range = { $lte: parseInt(max_price) };
    }
    if (property_type) {
      filter.property_type = { $regex: new RegExp(property_type, "i") };
    }

    const listings = await Listing.find(filter);

    if (!listings || listings.length === 0) {
      return res
        .status(404)
        .json({ message: "No listings found matching the criteria" });
    }

    res.json({ message: "Listings retrieved successfully", listings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

routers.post("/Contacts", authmiddleware, async (req, res) => {
  try {
    const { propertype, name, message, contact, emailid } = req.body;

    const newContact = new Contactform({
      propertype,
      name,
      message,
      contact,
      emailid,
    });
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

routers.get("/contact", authmiddleware, async (req, res) => {
  try {
    const contactForms = await Contactform.find();
    res.status(200).json(contactForms);
  } catch (error) {
    console.error("Error fetching contact forms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = routers;
