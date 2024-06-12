
export type Commodity = {
  name: string;
  price: number;
  quantity: number;
  commodityName: string;
  total: number;
};

const data: Commodity[] = [
  {
    name: "Мраморный щебень фр. 2-5 мм, 25кг",
    price: 1231,
    quantity: 12,
    commodityName: "Мраморный щебень фр. 2-5 мм",
    total: 1231,
  },
  {
    name: "Мраморный щебень фр. 2-5 мм, 25кг (белый)",
    price: 1231,
    quantity: 12,
    commodityName: "Мраморный щебень фр. 2-5 мм",
    total: 1231,
  },
  {
    name: "Мраморный щебень фр. 2-5 мм, 25кг (вайт)",
    price: 1231,
    quantity: 12,
    commodityName: "Мраморный щебень фр. 2-5 мм",
    total: 1231,
  },
  {
    name: "Мраморный щебень фр. 2-5 мм, 25кг, возврат",
    price: 1231,
    quantity: 12,
    commodityName: "Мраморный щебень фр. 2-5 мм",
    total: 1231,
  },
  {
    name: "Мраморный щебень фр. 2-5 мм, 1т",
    price: 1231,
    quantity: 12,
    commodityName: "Мраморный щебень фр. 2-5 мм",
    total: 1231,
  },
];

export default defineEventHandler((event) => {
  return data;
})