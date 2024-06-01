import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFetchOrders } from '../../services/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((store) => store.order.orderData);

  useEffect(() => {
    dispatch(getFetchOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
