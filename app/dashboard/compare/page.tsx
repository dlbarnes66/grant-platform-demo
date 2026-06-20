import CompareTable from "@/components/CompareTable";
import Card from "@/components/ui/Card";

// TEMP MOCK DATA — replace with DB fetch later
const mockGrants = [
  {
    id: "1",
    title: "Small Business Innovation Grant",
    amount: "$50,000",
    deadline: "July 1, 2026",
    category: "Federal",
    summary: "Funding for innovative small business projects.",
  },
  {
    id: "2",
    title: "State Economic Development Grant",
    amount: "$75,000",
    deadline: "August 15, 2026",
    category: "State",
    summary: "Support for economic development initiatives.",
  },
];

export default function ComparePage() {
  // TODO: Replace with real DB state
  const grants = mockGrants;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-brandBlue">Compare Grants</h1>

      <CompareTable
        grants={grants}
        onRemove={(id) => console.log("Remove grant", id)}
      />
    </div>
  );
}
