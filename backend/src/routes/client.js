import { Router } from 'express';
import * as clientCtrl from '../controllers/client';

const router = Router();

router.get('/', clientCtrl.findAllClients); 
router.get('/:id', clientCtrl.findClient); 
router.post('/', clientCtrl.createClient); 
router.put('/:id', clientCtrl.updateClient);
router.delete('/:id', clientCtrl.deleteClient); 

export default router; 
