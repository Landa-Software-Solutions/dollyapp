import { getArgentinaRates, getLastUpdated, getLatamQuotes } from "@/lib/dolarapi";
import { buildArVariants, buildLatamRows, formatUpdated } from "@/lib/format";
import HomeView from "./home-view";

export default async function Home() {
  const arRates = await getArgentinaRates();
  const latamQuotes = await getLatamQuotes(arRates?.oficial ?? null);
  const lastUpdated = getLastUpdated(latamQuotes);

  return (
    <HomeView
      arVariants={buildArVariants(arRates)}
      latamRows={buildLatamRows(latamQuotes)}
      lastUpdatedLabel={formatUpdated(lastUpdated)}
    />
  );
}
