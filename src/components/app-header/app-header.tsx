import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector((store) => store.user.userData);
  return <AppHeaderUI userName={user?.name} />;
};
