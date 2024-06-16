// const { model } = require('mongoose')
// const bcrypt = require('bcrypt')
const FloorPlan = require('../models/Floor')
// const jwt = require('jsonwebtoken')
// const nodemailer = require("nodemailer");
// const axios = require("axios")
// const env = require('dotenv');

// env.config();


exports.get_floor_plans = async (req, res) => {
    try {
        const floorPlans = await FloorPlan.find();
        res.json(floorPlans);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

exports.get_floor_plans_by_id=async(req,res)=>{
    try {
        const floorPlan = await FloorPlan.findById(req.params.id);
        if (floorPlan) {
          res.json(floorPlan);
        } else {
          res.status(404).json({ message: 'Floor plan not found' });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

exports.get_floorplans = async(req,res)=>{
    const products = await FloorPlan.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "No Product found" })
    }
}

exports.delete_floor_plan = async(req,res)=>{
    try {
        const deletedFloorPlan = await FloorPlan.findByIdAndDelete(req.params.id);
        if (deletedFloorPlan) {
          res.json({ message: 'Floor plan deleted successfully' });
        } else {
          res.status(404).json({ message: 'Floor plan not found' });
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}


exports.search_key  = async(req,resp)=>{
    let result = await FloorPlan.find({
        "$or": [
            {
                name: { $regex: req.params.key }  
            },
            {
                description: { $regex: req.params.key }
            },

        ]
    });
    resp.send(result);
}

exports.add_floorplan = async(req, res) => {
    const floorPlan = new FloorPlan(req.body);
    try {
      const newFloorPlan = await floorPlan.save();
      res.status(201).json(newFloorPlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
}

exports.update_floorplan_by_id = async(req, res) => {
    try {
        const floorPlan = await FloorPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (floorPlan) {
          res.json(floorPlan);
        } else {
          res.status(404).json({ message: 'Floor plan not found' });
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}