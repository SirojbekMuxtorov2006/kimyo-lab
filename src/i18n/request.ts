import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { notFound } from "next/navigation";
import { routing } from "./routing";

import en from "../../messages/en.json";
import ru from "../../messages/ru.json";
import uz from "../../messages/uz.json";

const messages = { uz, ru, en } as const;

export default getRequestConfig(async ({ locale }) => {
  const requested = locale ?? (await rootLocale());

  if (!hasLocale(routing.locales, requested)) {
    notFound();
  }

  return {
    locale: requested,
    messages: messages[requested],
    timeZone: "Asia/Tashkent",
    formats: {
      number: {
        currency: {
          style: "currency",
          currency: "UZS",
          maximumFractionDigits: 0,
        },
        compact: {
          notation: "compact",
          maximumFractionDigits: 1,
        },
      },
      dateTime: {
        short: {
          day: "numeric",
          month: "short",
          year: "numeric",
        },
        long: {
          day: "numeric",
          month: "long",
          year: "numeric",
          weekday: "long",
        },
      },
    },
  };
});
