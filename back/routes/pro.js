import { Router } from 'express';
import { createDisponibilite, getDisponibilite } from '../controller/disponibilite.js';
import { getDemandeReservation, getPhone, historiqueForPro, takeDemandeId } from '../controller/reservation.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isPro } from '../middleware/isAuthorized.js';

const proRouter = Router();

proRouter.post('/dispo/update', isAuthenticated, isPro, createDisponibilite)
proRouter.get('/dispo', isAuthenticated, isPro, getDisponibilite)
proRouter.get('/getDemandes', isAuthenticated, isPro, getDemandeReservation);
proRouter.put('/:demandeId/activate', isAuthenticated, isPro, takeDemandeId);
proRouter.get("/getDemande/:demandId", isAuthenticated, isPro, getPhone);
proRouter.get("/historique", isAuthenticated, isPro, historiqueForPro);

export default proRouter;