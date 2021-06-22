import { Router } from 'express';
import Provider from '../models/Provider';
import * as providerCtrl from '../controllers/provider.js';

const router = Router();

router.get('/', providerCtrl.findAllProviders); 

router.post('/', providerCtrl.createProvider); 

router.put('/:id', providerCtrl.updateProvider);

router.delete('/:id', providerCtrl.deleteProvider); 

module.exports = router; 

