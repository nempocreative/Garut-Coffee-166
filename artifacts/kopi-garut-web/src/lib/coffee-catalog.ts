import { coffeeCatalog } from '@workspace/kopi-garut-shared';

export const webCoffeeCatalog = coffeeCatalog.map((coffee) =>
  coffee.id === 'garut-house-blend'
    ? {
        ...coffee,
        name: 'Garut Origin Selection',
        series: 'Garut Origin Selection',
        image: 'garut-origin-selection.png',
      }
    : coffee,
);