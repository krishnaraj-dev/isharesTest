import { AppConfig } from "../config/config";

// Format the price above to USD using the locale, style, and currency.
export const currencyFormat = (
  currency: string = AppConfig.currency,
  value: number
) => {
  let data = new Intl.NumberFormat(AppConfig.language, {
    style: "currency",
    currency: currency,
  });

  return data.format(value);
};

export const priceToNumber = (value: string) => {
  return Number(value.replace(AppConfig.currencySymbol, ""));
};

export const getMarketValue = (price: string, quantity: number) => {
  return priceToNumber(price) * quantity;
};
