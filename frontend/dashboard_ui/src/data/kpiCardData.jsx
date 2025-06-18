// src/data/dummyData.js
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';

export const dummyKPIData = [
  {
    title: 'Total Sales',
    value: '$1,458,200',
    change: '+12.5%',
    isPositive: true,
    icon: <DollarSign size={24} />,
  },
  {
    title: 'Total Customers',
    value: '8,294',
    change: '+7.2%',
    isPositive: true,
    icon: <Users size={24} />,
  },
  {
    title: 'Total Orders',
    value: '12,543',
    change: '+4.3%',
    isPositive: true,
    icon: <ShoppingCart size={24} />,
  },
  {
    title: 'Average Order Value',
    value: '$116.25',
    change: '-2.1%',
    isPositive: false,
    icon: <TrendingUp size={24} />,
  },
];
