const mongoose = require('mongoose');
import Client from '../models/Client';


export const findAllClients = async (req, res) => {
    try {
        const clients = await Client.find().populate({ path: 'providers', select: 'name' }).exec();
        res.json(clients);

    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong retriving the clients'
        })
    }
};

export const createClient = async (req, res, next) => {
    if (!req.params.name){
        try {
            const client = new Client(req.body); 
            const existingClient = await Client.findOne({ name: client.name });
            if (existingClient === null){
                client.providers = client.providers.map((p) => mongoose.Types.ObjectId(p));
                await client.save();
                res.json({
                    status: 'Client saved'
                })
            } else {
                throw new Error(`Client with name ${client.name} already exists`);
            };
        } catch (error) {
            res.status(500).json({
            message: error.message || 'Error upon creating Client...'
            }); 
        };
    };
};

export const updateClient = async (req, res, next) => {
    try {
         await Client.findByIdAndUpdate(req.params.id, req.body);
         res.json({
             status: 'Client updated'
         })
     } catch (error) {
         next(error)    
     }
 }; 

 export const deleteClient = async (req, res, next) => {
    const { id } = req.params; 
    try {
        await Client.findByIdAndRemove(id);
        res.json({
            status: 'Client Deleted'
        })
    } catch (error) {
        res.status(500).json({
            message: `Cannot delete client with  ${id}...`,
    })
    }
};
export const findClient = async (req, res, next) => {
    const { id } = req.params; 
    try {
        const client = await Client.findById(id);
        if (!client) 
        return res
            .status(404)
            .json( { message: `Client with id ${id} does not exist` } )
        res.json(client)
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retriving Client with id ${id}...`,
    })
    }
}; 