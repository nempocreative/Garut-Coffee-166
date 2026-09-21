import { ImageSource } from 'expo-image';

export type ExtensionWorker = {
  id: string;
  name: string;
  role: string;
  regions: string[];
  focus: string;
  image: ImageSource;
};

export const extensionTeam: ExtensionWorker[] = [
  {
    id: 'rani-permata',
    name: 'Rani Permata',
    role: 'Penyuluh utama',
    regions: ['Cikajang', 'Cisurupan'],
    focus: 'Mutu lot & tindak lanjut kebun',
    image: require('../assets/images/penyuluh-rani-permata.jpg'),
  },
  {
    id: 'dimas-suryana',
    name: 'Dimas Suryana',
    role: 'Penyuluh lapangan',
    regions: ['Pakenjeng', 'Cisurupan'],
    focus: 'Perawatan tanaman & panen',
    image: require('../assets/images/penyuluh-dimas-suryana.jpg'),
  },
  {
    id: 'nia-kurniasih',
    name: 'Nia Kurniasih',
    role: 'Penyuluh lapangan',
    regions: ['Samarang', 'Cikajang'],
    focus: 'Pascapanen & pengeringan',
    image: require('../assets/images/penyuluh-nia-kurniasih.jpg'),
  },
];