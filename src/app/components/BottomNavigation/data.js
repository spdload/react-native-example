import React from 'react';
import Icon from '../Icons';
import * as routes from '../../constants/routes';
import Typography from '../Typography';

export const bottomNavigationUser = [
  {
    id: 1,
    name: 'Home',
    icon: color => <Icon name="Icon-39" color={color} size={25} />,
    iconActive: color => <Icon name="Icon-3" color={color} size={25} />,
    redirectTo: routes.HOME,
  },
  {
    id: 2,
    name: 'DMs',
    icon: color => <Icon name="Icon-41" color={color} size={25} />,
    iconActive: color => <Icon name="Icon-2" color={color} size={25} />,
    redirectTo: routes.DM_LLIST,
  },
  {
    id: 3,
    name: 'Shelf',
    icon: color => <Icon name="Icon-48" color={color} size={25} />,
    iconActive: color => <Icon name="Icon-4" color={color} size={25} />,
    redirectTo: routes.SHELF,
  },
];

export const bottomNavigationAdmin = [
  {
    id: 1,
    name: 'Home',
    icon: color => <Icon name="Icon-39" color={color} size={25} />,
    iconActive: color => <Icon name="Icon-3" color={color} size={25} />,
    redirectTo: routes.HOME,
  },
  {
    id: 2,
    name: 'Members',
    icon: color => <Icon name="Icon-56" color={color} size={25} />,
    iconActive: color => <Icon name="Icon-25" color={color} size={25} />,
    redirectTo: routes.MEMBERS,
  },
  {
    id: 3,
    name: 'Dashboard',
    icon: color => <Icon name="Icon-44" color={color} size={25} />,
    iconActive: color => <Icon name="Icon-24" color={color} size={25} />,
    redirectTo: routes.DASHBOARD,
  },
  {
    id: 4,
    name: 'Shelf',
    icon: color => <Icon name="Icon-39" color={color} size={25} />,
    iconActive: color => <Icon name="Icon-38" color={color} size={25} />,
    redirectTo: routes.SHELF,
  },
];
