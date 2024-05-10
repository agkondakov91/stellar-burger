import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFetchFeeds, feedsSelector } from '../../services/feedSlice';
import {
  getIngredients,
  selectIngredients
} from '../../services/ingredientsSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  useEffect(() => {
    if (!ingredients) {
      dispatch(getIngredients());
    }
    dispatch(getFetchFeeds());
  }, []);

  const handleGetFeeds = () => {
    dispatch(getFetchFeeds());
  };

  if (!feed.feed) {
    return <Preloader />;
  }

  return <FeedUI orders={feed.feed.orders} handleGetFeeds={handleGetFeeds} />;
};
