import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import ServicesPageClient from "./page-client";

const NAMESPACES = ["servicesPage", "servicesList", "common"] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <ServicesPageClient />
    </NextIntlClientProvider>
  );
}
