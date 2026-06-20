import Card, { CardHeader, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

async function getGrant(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/grants/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function GrantDetailsPage({ params }: any) {
  const grant = await getGrant(params.id);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-brandBlue">{grant.title}</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Grant Details</h2>
            {grant.category && <Badge variant="info">{grant.category}</Badge>}
          </div>
        </CardHeader>

        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold text-gray-800">Amount:</span>{" "}
            {grant.amount || "—"}
          </p>

          <p>
            <span className="font-semibold text-gray-800">Deadline:</span>{" "}
            {grant.deadline || "—"}
          </p>

          <p className="whitespace-pre-line">{grant.summary}</p>

          {grant.description && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Description</h3>
              <p className="whitespace-pre-line">{grant.description}</p>
            </div>
          )}
        </div>

        <CardFooter className="flex justify-between mt-6">
          <Button variant="outline">Save</Button>
          <Button variant="primary">Compare</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
