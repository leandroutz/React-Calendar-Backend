const {response} = require('express')
const Event = require('../models/Event')

const getEvents = async (req, res = response) => {

    const events = await Event.find()
                              .populate('user', 'name');
    res.json({
        ok: true,
        msg: events
    })
};

const createEvent = async (req, res = response) => {
    
    const event = new Event(req.body)

    
    
    try {
        if(!req.body.notes) {event.notes = ""}
        event.user = req.uid
        const savedEvent = await event.save()
        res.json({
            ok: true,
            event: savedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }

}
    

const updateEvent = async (req, res = response) => {

    
    const eventId = req.params.id
    const uid = req.uid
    try {

        const event = await Event.findById(eventId)
        
        if(!event) { 
            return (
                res.status(404).json({
                    ok: false,
                    msg: 'Evento no existe'
                })
            )
        }
        
        if(event.user.toString() !== uid) {
            return (
                res.status(401).json({
                    ok: false,
                    msg: 'No tiene privilegio de editar este evento'
                })
            )
        }
        const newEvent = {
            ...req.body,
            user: uid,
        }

        // console.log(newEvent);
        
        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true})
       
        res.json({
            ok: true,
            event: updatedEvent
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the admin boy'
        })
        
    }
};

const deleteEvent = async(req, res = response) => {
    const eventId = req.params.id
    const uid = req.uid
    try {

        const event = await Event.findById(eventId)
        
        if(!event) { 
            return (
                res.status(404).json({
                    ok: false,
                    msg: 'Evento no existe'
                })
            )
        }
        
        if(event.user.toString() !== uid) {
            return (
                res.status(401).json({
                    ok: false,
                    msg: 'No tiene privilegio de editar este evento'
                })
            )
        }


        
        const deletedEvent = await Event.findByIdAndDelete(eventId)
       
        res.json({
            ok: true,
            msg: 'Event Deleted',
            event: deletedEvent
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the admin boy'
        })
        
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}