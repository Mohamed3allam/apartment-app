import express from 'express';
import {
  getApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  deleteApartment
} from '../../controllers/apartment.controller';

const router = express.Router();

router.route('/')
  .get(getApartments)
  .post(createApartment);

router.route('/:id')
  .get(getApartmentById)
  .put(updateApartment)
  .delete(deleteApartment);

export default router;