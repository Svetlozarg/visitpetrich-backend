import expressAsyncHandler from "express-async-handler";
import Place from "../models/place.model";

//@desc Get all places
//?@route GET /api/place/all
//@access private
export const getAllPlaces = expressAsyncHandler(async (req, res) => {
  const places = await Place.find({});
  res.status(200).json({ success: true, data: places });
});

//@desc Get a single place
//?@route GET /api/place/:id
//@access private
export const getPlace = expressAsyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (place) {
    res.status(200).json({ success: true, data: place });
  } else {
    res.status(404);
    res.send({ success: false, message: "Place not found" });
  }
});

//@desc Create a place
//!@route POST /api/place/create
//@access private
export const createPlace = expressAsyncHandler(async (req, res) => {
  const place = await Place.create(req.body);
  if (place) {
    res.status(201).json({ success: true, data: place });
  } else {
    res.status(400);
    res.send({ success: false, message: "Place data is not valid" });
  }
});

//@desc Update a place
//!@route PUT /api/place/:id
//@access private
export const updatePlace = expressAsyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (place) {
    place.name = req.body.name || place.name;
    place.location = req.body.location || place.location;
    place.url = req.body.url || place.url;
    place.image = req.body.image || place.image;
    place.category = req.body.category || place.category;

    const updatedPlace = await place.save();
    res.status(200).json({ success: true, data: updatedPlace });
  } else {
    res.status(404);
    res.send({ success: false, message: "Place not found" });
  }
});

//@desc Delete a place
//!@route DELETE /api/place/:id
//@access private
export const deletePlace = expressAsyncHandler(async (req, res) => {
  const plaace = await Place.findOneAndDelete({ _id: req.params.id });
  if (!plaace) {
    res.status(404);
    throw new Error("Place not found");
  }
  res.status(200).json({ success: true, message: "Place deleted successfuly" });
});
