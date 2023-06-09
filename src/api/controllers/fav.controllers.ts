import { Request, Response, NextFunction } from 'express';
import PrismaError from '@config/errorsHandler/PrismaError.config';
import { getAllUserFavoritesService } from '@services/users/users.service';
import {
  getSingleFavoriteListService,
  handleFavoriteList,
  deleteSingleFavoriteListService,
  deleteSingleFavoriteItemService,
} from '@services/favorites/fav.service';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';

export const allUserFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.user;
    const favs = await getAllUserFavoritesService(email);
    res.status(200).json(favs);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};

export const createFavoriteList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.user;
    const favoriteListResponse = await handleFavoriteList(req.body, email);
    res.status(201).json(favoriteListResponse);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};

export const singleFavoriteList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.user;
    const { id: listId } = req.params;
    const favoriteList = await getSingleFavoriteListService(email, listId);
    res.status(200).json(favoriteList);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};

export const removeFavoriteList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id: listId } = req.params;
    const idRemoved = await deleteSingleFavoriteListService(listId);
    res.status(200).json(idRemoved);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};

export const removeFavoriteItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { listID, itemID } = req.body;
    const newListUpdated = await deleteSingleFavoriteItemService(listID, itemID);
    res.status(200).json(newListUpdated);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};
