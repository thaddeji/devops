import express from 'express';
import { createClient, deleteClient, getClients, getClientSearch, updateClient } from '../controllers/client.controller.js';



const router = express.Router();


router.post('/create', createClient);
router.get('/getclients', getClients);
router.get('/getclientsearch', getClientSearch);
router.delete('/deleteclient/:clientId', deleteClient);
router.put('/update/:clientId', updateClient);






export default router;