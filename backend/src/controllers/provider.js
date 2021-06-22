import Provider from '../models/Provider';

export const findAllProviders = async (req, res) => {
    const providers = await Provider.find();
    res.json(providers);
}; 

export const createProvider = async (req, res, next) => {
    try {
        const provider = new Provider(req.body); 
        const existingProvider = await Provider.findOne({ name: provider.name });
        if (existingProvider === null) {
            await provider.save();
        } else {
            throw new Error(`Provider with name ${provider.name} already exists`);
        }
        res.json({
            status: 'Provider saved'
        })
    } catch (error) {
        next(error)
    }
}; 

export const updateProvider = async (req, res, next) => {
   try {
        await Provider.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            status: 'Provider updated'
        })
    } catch (error) {
        next(error)    
    }
};

export const deleteProvider = async (req, res, next) => {
    try {
        await Provider.findByIdAndRemove(req.params.id);
        res.json({
            status: 'Provider Deleted'
        })
    } catch (error) {
        next(error)    
    }
}; 