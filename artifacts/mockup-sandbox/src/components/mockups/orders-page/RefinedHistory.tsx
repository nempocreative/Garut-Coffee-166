import { Refined, sampleOrders } from "./Refined";

export function RefinedHistory() {
  return <Refined orders={sampleOrders} />;
}