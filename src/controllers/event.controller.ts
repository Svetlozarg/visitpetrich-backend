import expressAsyncHandler from "express-async-handler";
import Event from "../models/event.model";

//@desc Get all events
//?@route GET /api/event/all
//@access private
export const getAllEvents = expressAsyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.status(200).json({ success: true, data: events });
});

//@desc Get a single event
//?@route GET /api/event/:id
//@access private
export const getEvent = expressAsyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    res.status(200).json({ success: true, data: event });
  } else {
    res.status(404);
    res.send({ success: false, message: "Event not found" });
  }
});

//@desc Create an event
//!@route POST /api/event/create
//@access private
export const createEvent = expressAsyncHandler(async (req, res) => {
  const event = await Event.create(req.body);
  if (event) {
    res.status(201).json({ success: true, data: event });
  } else {
    res.status(400);
    res.send({ success: false, message: "Event data is not valid" });
  }
});

//@desc Update an event
//!@route PUT /api/event/:id
//@access private
export const updateEvent = expressAsyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (event) {
    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.startDate = req.body.startDate || event.startDate;
    event.endDate = req.body.endDate || event.endDate;
    event.location = req.body.location || event.location;
    event.phone = req.body.phone || event.phone;
    event.email = req.body.email || event.email;
    event.link = req.body.link || event.link;

    const updatedEvent = await event.save();
    res.status(200).json({ success: true, data: updatedEvent });
  } else {
    res.status(404);
    res.send({ success: false, message: "Event not found" });
  }
});

//@desc Delete an event
//!@route DELETE /api/event/:id
//@access private
export const deleteEvent = expressAsyncHandler(async (req, res) => {
  const event = await Event.findOneAndDelete({ _id: req.params.id });
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  res.status(200).json({ success: true, message: "Event deleted successfuly" });
});
