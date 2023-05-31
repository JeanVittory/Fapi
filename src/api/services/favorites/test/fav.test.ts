import { prismaMock } from '@database/test/singleton';
import { createItemService } from '@services/item/item.service';
import {
  createFavoriteListService,
  updateFavoriteListService,
  getSingleFavoriteListService,
  deleteSingleFavoriteListService,
} from '@services/favorites/fav.service';
import { favoriteList, item, response, categoryName, inputGetFavoriteList, responseGetFavoriteList } from './mocks';

describe('Tests from favorites service', () => {
  describe('Test services who need create an item before', () => {
    beforeEach(async () => {
      //@ts-ignore
      prismaMock.item.create.mockResolvedValue({ id: '1' });
      await expect(createItemService(item)).resolves.toEqual({ id: '1' });
    });

    it('Should return the ID of the favorite list created', async () => {
      prismaMock.fav.create.mockResolvedValue(response);
      await expect(createFavoriteListService(favoriteList)).resolves.toEqual(response);
    });

    it('Should return the ID of a new item added in a favorite list that already exist', () => {
      prismaMock.fav.update.mockResolvedValue(response);
      expect(updateFavoriteListService(categoryName, item)).resolves.toEqual(response);
    });
  });

  describe("Test services who don't need create items before", () => {
    it('Should return a list of favorites of the user found by ID', async () => {
      //@ts-ignore
      prismaMock.fav.findFirstOrThrow.mockResolvedValue(responseGetFavoriteList);

      await expect(getSingleFavoriteListService(inputGetFavoriteList.email, inputGetFavoriteList.id)).resolves.toEqual(
        responseGetFavoriteList,
      );
    });

    it('Should delete and return an ID of the item deleted', async () => {
      //@ts-ignore
      prismaMock.fav.delete.mockResolvedValue({ id: '1' });
      expect(deleteSingleFavoriteListService('1')).resolves.toEqual(response);
    });
  });
});
