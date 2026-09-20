import * as Linking from 'expo-linking';
import type { Farmer } from '@/data/hub';

export function getFarmerQrPath(farmer: Farmer) {
  return `/farmer/${farmer.id}`;
}

export function getFarmerQrValue(farmer: Farmer) {
  return Linking.createURL(getFarmerQrPath(farmer));
}