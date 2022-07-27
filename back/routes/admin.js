import { Router } from 'express';
import { getAllDemandes } from '../controller/dash.js';
import { getAmountStripe, getListAllPayment } from '../controller/payment.js';
// import { historiqueDemandesForAdmin } from '../controller/dash.js';
// import { proToVerify } from '../controller/dash.js';
import { activatePro, deletePro, getPro, updatePro } from '../controller/pro.js';
import { getDemandes, getDemandesFinish } from '../controller/reservation.js';
import { deleteParent, getParentFromId, getParents, getProFromId } from '../controller/user.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isAdmin } from '../middleware/Validators/isAdmin.js';

const router = Router();

router.get("/pro", isAuthenticated, isAdmin, getPro);
router.get("/parents", isAuthenticated, isAdmin, getParents);
router.get("/parent/:parentId", isAuthenticated, isAdmin, getParentFromId);
router.get("/pro/:proId", isAuthenticated, isAdmin, getProFromId);
// router.post("/", createParent);
router.put("/pro/:proId/activate", isAuthenticated, isAdmin, activatePro);
router.put("/pro/:proId", isAuthenticated, isAdmin, updatePro);
router.delete("/pro/:proId", deletePro);
router.delete("/parent/:parentId", deleteParent);
router.get("/demandes", isAuthenticated, isAdmin, getDemandes);
router.get("/demandesFini", isAuthenticated, isAdmin, getDemandesFinish);
router.get("/amountStripe", isAuthenticated, isAdmin, getAmountStripe);
router.get("/getAllDemandes", isAuthenticated, isAdmin, getAllDemandes);
router.get("/getListAllPayment", isAuthenticated, isAdmin, getListAllPayment);

export default router;