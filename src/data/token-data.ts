export interface Token {
  id: string;
  symbol: string;
  name: string;
  chain: string;
  image: string;
  price: string;
  priceUsd?: string;
  age: string;
  transactions: number;
  volume: number;
  change1h: number;
  change6h: number;
  change24h: number;
  liquidity: number;
}

export const tokens: Token[] = [
  {
    id: "zeus",
    symbol: "ZEUS",
    name: "Zeus",
    chain: "ETH",
    image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=1",
    price: "47.47M",
    priceUsd: "0.01131",
    age: "8d",
    transactions: 12906,
    volume: 10200000,
    change1h: -1.1,
    change6h: -6.7,
    change24h: 94.6,
    liquidity: 902390
  },
  {
    id: "pro",
    symbol: "PRO",
    name: "Procoin",
    chain: "ETH",
    image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=2",
    price: "2.22M",
    priceUsd: "0.002213",
    age: "7h",
    transactions: 9789,
    volume: 3100000,
    change1h: 0.2,
    change6h: 22.3,
    change24h: 3156.2,
    liquidity: 417930
  },
  {
    id: "bookie",
    symbol: "BOOKIE",
    name: "Bookie AI",
    chain: "VIRTUAL",
    image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=3",
    price: "11.15M",
    priceUsd: "0.01112",
    age: "14h",
    transactions: 54887,
    volume: 4400000,
    change1h: -0.4,
    change6h: 0.1,
    change24h: 304.9,
    liquidity: 767420
  },
  {
    id: "gravity",
    symbol: "GRAVITY",
    name: "We Love Gravity",
    chain: "SOL",
    image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=4",
    price: "40.07K",
    priceUsd: "0.00003953",
    age: "10h",
    transactions: 39998,
    volume: 12100000,
    change1h: -2.7,
    change6h: 0.7,
    change24h: -49,
    liquidity: 23070
  },
  {
    id: "virgen",
    symbol: "VIRGEN",
    name: "VIRGEN",
    chain: "VIRTUAL",
    image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=5",
    price: "30.32M",
    priceUsd: "0.03067",
    age: "6d",
    transactions: 26348,
    volume: 5400000,
    change1h: 0.9,
    change6h: -5,
    change24h: 0.3,
    liquidity: 1330000
  },
  {
    id: "virtual",
    symbol: "VIRTUAL",
    name: "Virtual Protocol",
    chain: "ETH",
    image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=6",
    price: "1.17B",
    priceUsd: "2.3457",
    age: "7 mths",
    transactions: 276124,
    volume: 1700000,
    change1h: 0.5,
    change6h: -1.5,
    change24h: -3.9,
    liquidity: 9920000
  },
  {
    id: "zbcn",
    symbol: "ZBCN",
    name: "Zebec Network",
    chain: "USDC",
    image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=7",
    price: "580.71M",
    priceUsd: "0.00581",
    age: "3 mths",
    transactions: 29248,
    volume: 7100000,
    change1h: 0.3,
    change6h: 5.5,
    change24h: 24.3,
    liquidity: 451520
  },
  {
    id: "kta",
    symbol: "KTA",
    name: "Keeta",
    chain: "ETH",
    image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=8",
    price: "784.78M",
    priceUsd: "0.7846",
    age: "2 mths",
    transactions: 34759,
    volume: 14900000,
    change1h: -0.1,
    change6h: -3.6,
    change24h: 0.6,
    liquidity: 14240000
  },
  {
    id: "up",
    symbol: "UP",
    name: "up up up up up up up",
    chain: "SOL",
    image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=9",
    price: "1.12M",
    priceUsd: "0.00109",
    age: "13h",
    transactions: 54887,
    volume: 4400000,
    change1h: 4.5,
    change6h: 42.1,
    change24h: 1381.2,
    liquidity: 135480
  }
];
