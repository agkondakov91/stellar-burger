import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFetchFeeds } from '../../services/orderSlice';

import { TOrder } from '@utils-types';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector((store) => store.order.orderData);

  useEffect(() => {
    dispatch(getFetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFetchFeeds());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
