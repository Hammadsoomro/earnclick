import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  Wallet,
  DollarSign,
  Clock,
  CheckCircle,
  CreditCard,
  Building,
  Bitcoin,
  Info,
  Calendar,
  TrendingUp,
  Download,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Withdraw() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [withdrawalData, setWithdrawalData] = useState({
    paypal: { email: "" },
    bank: { accountNumber: "", routingNumber: "", accountName: "" },
    crypto: { walletAddress: "", network: "BTC" },
  });

  const accountStats = {
    availableBalance: 67.5,
    pendingWithdrawals: 25.0,
    totalWithdrawn: 180.0,
    minimumWithdraw: 5.0,
  };

  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal",
      icon: CreditCard,
      fee: "2%",
      minAmount: 5,
      processingTime: "1-3 hours",
      description: "Fast and secure PayPal transfer",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Building,
      fee: "$3",
      minAmount: 10,
      processingTime: "1-3 business days",
      description: "Direct transfer to your bank account",
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: Bitcoin,
      fee: "1%",
      minAmount: 5,
      processingTime: "30 minutes",
      description: "Bitcoin, Ethereum, or USDT",
    },
  ];

  const withdrawalHistory = [
    {
      id: 1,
      amount: 50.0,
      method: "PayPal",
      status: "Completed",
      requestDate: "2024-01-18",
      completedDate: "2024-01-18",
      fee: 1.0,
      reference: "WD001234",
    },
    {
      id: 2,
      amount: 75.0,
      method: "Bank Transfer",
      status: "Completed",
      requestDate: "2024-01-15",
      completedDate: "2024-01-17",
      fee: 3.0,
      reference: "WD001235",
    },
    {
      id: 3,
      amount: 30.0,
      method: "PayPal",
      status: "Processing",
      requestDate: "2024-01-20",
      completedDate: null,
      fee: 0.6,
      reference: "WD001236",
    },
    {
      id: 4,
      amount: 25.0,
      method: "Cryptocurrency",
      status: "Pending",
      requestDate: "2024-01-20",
      completedDate: null,
      fee: 0.25,
      reference: "WD001237",
    },
  ];

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement withdrawal logic
    console.log("Withdrawal request:", {
      method: selectedMethod,
      amount,
      details: withdrawalData[selectedMethod as keyof typeof withdrawalData],
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-600";
      case "Processing":
        return "bg-blue-500/10 text-blue-600";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-600";
      case "Rejected":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  const calculateFee = (amount: number, method: string) => {
    const selectedPaymentMethod = paymentMethods.find((m) => m.id === method);
    if (!selectedPaymentMethod) return 0;

    if (selectedPaymentMethod.fee.includes("%")) {
      const percentage = parseFloat(selectedPaymentMethod.fee.replace("%", ""));
      return (amount * percentage) / 100;
    } else {
      return parseFloat(selectedPaymentMethod.fee.replace("$", ""));
    }
  };

  const getNetAmount = () => {
    const withdrawAmount = parseFloat(amount) || 0;
    const fee = calculateFee(withdrawAmount, selectedMethod);
    return withdrawAmount - fee;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Header />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Withdraw Funds</h1>
          <p className="text-muted-foreground">
            Request withdrawal of your earned money to your preferred payment
            method
          </p>
        </div>

        {/* Account Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Available Balance
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    ${accountStats.availableBalance.toFixed(2)}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending Withdrawals
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    ${accountStats.pendingWithdrawals.toFixed(2)}
                  </p>
                </div>
                <div className="h-12 w-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Withdrawn
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${accountStats.totalWithdrawn.toFixed(2)}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Minimum Withdraw
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    ${accountStats.minimumWithdraw.toFixed(2)}
                  </p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Withdrawal Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Request Withdrawal</CardTitle>
                <CardDescription>
                  Choose your payment method and amount to withdraw
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWithdraw} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    <Label>Select Payment Method</Label>
                    <div className="grid gap-4">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                          <div
                            key={method.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              selectedMethod === method.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => setSelectedMethod(method.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{method.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {method.description}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant="secondary">
                                  Fee: {method.fee}
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {method.processingTime}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Amount Input */}
                  {selectedMethod && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Withdrawal Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            className="pl-10"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min={
                              paymentMethods.find(
                                (m) => m.id === selectedMethod,
                              )?.minAmount
                            }
                            max={accountStats.availableBalance}
                            step="0.01"
                            required
                          />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>
                            Min: $
                            {paymentMethods
                              .find((m) => m.id === selectedMethod)
                              ?.minAmount.toFixed(2)}
                          </span>
                          <span>
                            Available: $
                            {accountStats.availableBalance.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Fee Calculation */}
                      {amount && parseFloat(amount) > 0 && (
                        <Card className="bg-muted/50">
                          <CardContent className="p-4">
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Withdrawal Amount:</span>
                                <span>${parseFloat(amount).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-muted-foreground">
                                <span>Processing Fee:</span>
                                <span>
                                  -$
                                  {calculateFee(
                                    parseFloat(amount),
                                    selectedMethod,
                                  ).toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between font-medium text-lg border-t pt-2">
                                <span>You'll Receive:</span>
                                <span className="text-green-600">
                                  ${getNetAmount().toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}

                  {/* Payment Details */}
                  {selectedMethod === "paypal" && (
                    <div className="space-y-2">
                      <Label htmlFor="paypal-email">PayPal Email</Label>
                      <Input
                        id="paypal-email"
                        type="email"
                        placeholder="your@paypal.com"
                        value={withdrawalData.paypal.email}
                        onChange={(e) =>
                          setWithdrawalData({
                            ...withdrawalData,
                            paypal: { email: e.target.value },
                          })
                        }
                        required
                      />
                    </div>
                  )}

                  {selectedMethod === "bank" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="account-name">Account Name</Label>
                        <Input
                          id="account-name"
                          placeholder="Full name on account"
                          value={withdrawalData.bank.accountName}
                          onChange={(e) =>
                            setWithdrawalData({
                              ...withdrawalData,
                              bank: {
                                ...withdrawalData.bank,
                                accountName: e.target.value,
                              },
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-number">Account Number</Label>
                        <Input
                          id="account-number"
                          placeholder="Your bank account number"
                          value={withdrawalData.bank.accountNumber}
                          onChange={(e) =>
                            setWithdrawalData({
                              ...withdrawalData,
                              bank: {
                                ...withdrawalData.bank,
                                accountNumber: e.target.value,
                              },
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="routing-number">Routing Number</Label>
                        <Input
                          id="routing-number"
                          placeholder="Bank routing number"
                          value={withdrawalData.bank.routingNumber}
                          onChange={(e) =>
                            setWithdrawalData({
                              ...withdrawalData,
                              bank: {
                                ...withdrawalData.bank,
                                routingNumber: e.target.value,
                              },
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  )}

                  {selectedMethod === "crypto" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="crypto-network">Network</Label>
                        <Select
                          value={withdrawalData.crypto.network}
                          onValueChange={(value) =>
                            setWithdrawalData({
                              ...withdrawalData,
                              crypto: {
                                ...withdrawalData.crypto,
                                network: value,
                              },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                            <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                            <SelectItem value="USDT">Tether (USDT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wallet-address">Wallet Address</Label>
                        <Input
                          id="wallet-address"
                          placeholder="Your crypto wallet address"
                          value={withdrawalData.crypto.walletAddress}
                          onChange={(e) =>
                            setWithdrawalData({
                              ...withdrawalData,
                              crypto: {
                                ...withdrawalData.crypto,
                                walletAddress: e.target.value,
                              },
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  {selectedMethod && (
                    <Button
                      type="submit"
                      className="w-full gradient-primary text-lg py-6"
                      disabled={
                        !amount ||
                        parseFloat(amount) < accountStats.minimumWithdraw ||
                        parseFloat(amount) > accountStats.availableBalance
                      }
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Request Withdrawal of ${getNetAmount().toFixed(2)}
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span>Important Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Withdrawals are processed within 24 hours on business days.
                    Minimum withdrawal amount is $5.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Processing Times:</h4>
                    <ul className="space-y-1 text-muted-foreground mt-1">
                      <li>• PayPal: 1-3 hours</li>
                      <li>• Bank Transfer: 1-3 business days</li>
                      <li>• Cryptocurrency: 30 minutes</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium">Security:</h4>
                    <ul className="space-y-1 text-muted-foreground mt-1">
                      <li>• All withdrawals are manually reviewed</li>
                      <li>• Email confirmation required</li>
                      <li>• 2FA authentication recommended</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Withdraw</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setAmount("10")}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Withdraw $10
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setAmount("25")}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Withdraw $25
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setAmount("50")}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Withdraw $50
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() =>
                    setAmount(accountStats.availableBalance.toString())
                  }
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Withdraw All (${accountStats.availableBalance.toFixed(2)})
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Withdrawal History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Withdrawal History</span>
            </CardTitle>
            <CardDescription>
              Track all your withdrawal requests and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Completed Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawalHistory.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell className="font-mono">
                      {withdrawal.reference}
                    </TableCell>
                    <TableCell className="font-medium">
                      ${withdrawal.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{withdrawal.method}</TableCell>
                    <TableCell className="text-muted-foreground">
                      ${withdrawal.fee.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(withdrawal.status)}
                      >
                        {withdrawal.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{withdrawal.requestDate}</TableCell>
                    <TableCell>
                      {withdrawal.completedDate || (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
