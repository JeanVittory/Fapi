import { Router } from 'express';
import { GET_SINGLE_ARTWORK_BY_NAME } from './endpoints/artworks.endpoint';
import { artworkNameValidation } from '@middlewares/artworkNameValidation.middleware';
import { getArtworkByName } from '@controllers/artworks.controller';

const artworksRouter = Router();

artworksRouter.get(GET_SINGLE_ARTWORK_BY_NAME, artworkNameValidation, getArtworkByName);

export default artworksRouter;