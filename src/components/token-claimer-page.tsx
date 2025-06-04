import React from "react";
import { Card, CardBody, Button, Input, Progress, Badge } from "@heroui/react";
import { Icon } from "@iconify/react";

export const TokenClaimerPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [claimAmount, setClaimAmount] = React.useState("");

  const handleClaim = async () => {
    setIsLoading(true);
    try {
      // Implement token claiming logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Tokens claimed successfully!");
    } catch (error) {
      console.error("Failed to claim tokens:", error);
      alert("Failed to claim tokens. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {/* Hero Section */}
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-3xl font-bold">YouBuidl Token Claim</h1>
        <p className="text-default-600 max-w-2xl mx-auto">
          Claim your YBLD tokens and join the YouBuidl DAO
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Claim Card */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardBody className="p-6 space-y-6">
              {/* Token Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon icon="lucide:coins" className="text-primary" width={24} height={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">YBLD Token</h3>
                    <p className="text-default-500 text-sm">YouBuidl Governance Token</p>
                  </div>
                </div>
                <Badge color="success" variant="flat">Active</Badge>
              </div>

              {/* Claim Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Claimed</span>
                  <span className="font-semibold">5,000 / 10,000 YBLD</span>
                </div>
                <Progress 
                  value={50}
                  className="h-2"
                  color="primary"
                />
              </div>

              {/* Claim Form */}
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount to Claim</label>
                  <Input
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    type="number"
                    placeholder="Enter amount"
                    size="sm"
                    startContent={
                      <div className="pointer-events-none">
                        <Icon icon="lucide:coins" className="text-default-400" width={16} />
                      </div>
                    }
                    endContent={
                      <div className="pointer-events-none">
                        <span className="text-default-400 text-sm">YBLD</span>
                      </div>
                    }
                  />
                </div>

                <Button
                  className="w-full"
                  color="primary"
                  size="lg"
                  isLoading={isLoading}
                  onPress={handleClaim}
                >
                  {isLoading ? "Claiming..." : "Claim Tokens"}
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardBody className="p-6">
              <h3 className="font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-4">
                <div className="text-center text-default-500 py-8">
                  <Icon icon="lucide:inbox" className="mx-auto mb-2" width={24} />
                  <p>No transactions yet</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Token Stats */}
          <Card>
            <CardBody className="p-6 space-y-4">
              <h3 className="font-semibold">Token Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-default-500">Price</span>
                  <span className="font-medium">$1.20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-default-500">Market Cap</span>
                  <span className="font-medium">$12M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-default-500">Total Supply</span>
                  <span className="font-medium">10M YBLD</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Claim Rules */}
          <Card>
            <CardBody className="p-6 space-y-4">
              <h3 className="font-semibold">Claim Rules</h3>
              <ul className="space-y-3 text-sm text-default-500">
                <li className="flex items-start gap-2">
                  <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                  <span>Must have participated in YouBuidl beta</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                  <span>Minimum 30 days of active contribution</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon="lucide:check" className="text-success mt-1" width={16} />
                  <span>Claims are subject to a 6-month vesting period</span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
};
