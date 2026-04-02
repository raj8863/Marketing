
import Service from '../models/Service.js';


export const createService = async (req, res, next) => {
    try {
        const newService = new Service(req.body);
        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(400);
        next(error); // Passes the error to our custom middleware
    }
};

export const getServices = async (req, res, next) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500);
        next(error);
    }
};


export const getServiceBySlug = async (req, res, next) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug });
        if (!service) {
            res.status(404);
            throw new Error("Service not found");
        }
        res.status(200).json(service);
    } catch (error) {
        next(error);
    }
};


export const updateService = async (req, res, next) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedService) {
            res.status(404);
            throw new Error("Service not found");
        }
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(400);
        next(error);
    }
};


export const deleteService = async (req, res, next) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) {
            res.status(404);
            throw new Error("Service not found");
        }
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500);
        next(error);
    }
};