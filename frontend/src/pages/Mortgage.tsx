
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, DollarSign, Home, PieChart } from "lucide-react";
import Header from "@/components/Header";
import { getSavedProperties, subscribeToSavedProperties, SavedProperty } from '@/lib/savedProperties';

const Mortgage = () => {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const calculateMortgage = () => {
    const principal = homePrice - (homePrice * downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      const payment = principal / numberOfPayments;
      setMonthlyPayment(payment);
      setTotalPayment(principal);
      setTotalInterest(0);
    } else {
      const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                     (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      const total = payment * numberOfPayments;
      const interest = total - principal;
      
      setMonthlyPayment(payment);
      setTotalPayment(total);
      setTotalInterest(interest);
    }
  };

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, interestRate, loanTerm]);

  useEffect(() => {
    const favorites = getSavedProperties();
    setSavedProperties(favorites);
    if (!selectedPropertyId && favorites.length > 0) {
      setSelectedPropertyId(favorites[0].id);
      setHomePrice(favorites[0].price);
    }

    return subscribeToSavedProperties(() => {
      const updated = getSavedProperties();
      setSavedProperties(updated);
    });
  }, []);

  useEffect(() => {
    if (!selectedPropertyId) return;
    const property = savedProperties.find((item) => item.id === selectedPropertyId);
    if (property) {
      setHomePrice(property.price);
    }
  }, [selectedPropertyId, savedProperties]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyDecimal = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] bg-slate-900 shadow-2xl overflow-hidden border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 text-white">
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">Mortgage Calculator</p>
                  <h1 className="text-4xl font-bold tracking-tight mt-3 text-white">Estimate your monthly payment</h1>
                </div>
                <p className="text-slate-300 max-w-2xl leading-7">
                  Use a simple, modern mortgage calculator to estimate your payments and plan your next home purchase with confidence.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-800/95 border border-slate-700 p-5">
                    <p className="text-sm text-slate-300">Monthly Payment</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{formatCurrencyDecimal(monthlyPayment)}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-800/95 border border-slate-700 p-5">
                    <p className="text-sm text-slate-300">Total Interest</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{formatCurrency(totalInterest)}</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="rounded-3xl bg-slate-900/95 p-6 text-slate-100 shadow-xl border border-slate-800">
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Loan preview</p>
                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Loan amount</span>
                      <span className="font-semibold text-white">{formatCurrency(homePrice - (homePrice * downPayment / 100))}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Rate</span>
                      <span className="font-semibold text-white">{interestRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Term</span>
                      <span className="font-semibold text-white">{loanTerm} years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Down payment</span>
                      <span className="font-semibold text-white">{downPayment}%</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-900/95 p-6 text-slate-100 shadow-xl border border-slate-800">
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Quick tips</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-300">
                    <li>• Increase down payment to lower monthly cost.</li>
                    <li>• Shorter terms reduce interest but increase monthly payments.</li>
                    <li>• Rates under 5% are strong in most markets.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.95fr_0.95fr] gap-8 p-8 lg:p-10">
              <div className="space-y-8">
                <Card className="shadow-xl rounded-[1.75rem] border border-slate-200 overflow-hidden">
                  <CardHeader className="bg-slate-100 text-slate-900 px-6 py-5 border-b border-slate-200">
                    <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                      <Calculator className="w-5 h-5 text-cyan-600" />
                      Loan inputs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8 p-6 bg-slate-50">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-100">Home Price</p>
                          <p className="text-sm text-slate-400">Adjust the value to match your desired purchase price.</p>
                        </div>
                        <Input
                          type="number"
                          value={homePrice}
                          onChange={(e) => setHomePrice(Number(e.target.value))}
                          className="max-w-[220px]"
                        />
                      </div>
                      <Slider
                        value={[homePrice]}
                        onValueChange={(value) => setHomePrice(value[0])}
                        min={100000}
                        max={2000000}
                        step={10000}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-100">Down Payment</p>
                          <p className="text-sm text-slate-400">Current down payment: {downPayment}%</p>
                        </div>
                        <Input
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="max-w-[140px]"
                        />
                      </div>
                      <Slider
                        value={[downPayment]}
                        onValueChange={(value) => setDownPayment(value[0])}
                        min={0}
                        max={50}
                        step={1}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-100">Interest Rate</p>
                          <p className="text-sm text-slate-400">Use your expected mortgage APR.</p>
                        </div>
                        <Input
                          type="number"
                          value={interestRate}
                          step={0.1}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="max-w-[140px]"
                        />
                      </div>
                      <Slider
                        value={[interestRate]}
                        onValueChange={(value) => setInterestRate(value[0])}
                        min={1}
                        max={15}
                        step={0.1}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-100">Loan Term</p>
                          <p className="text-sm text-slate-400">Choose how many years to finance.</p>
                        </div>
                        <Input
                          type="number"
                          value={loanTerm}
                          min={10}
                          max={40}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="max-w-[140px]"
                        />
                      </div>
                      <Slider
                        value={[loanTerm]}
                        onValueChange={(value) => setLoanTerm(value[0])}
                        min={10}
                        max={40}
                        step={1}
                      />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Button className="w-full sm:w-auto bg-cyan-600 text-white hover:bg-cyan-500">
                        Update estimate
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-slate-100"
                        onClick={() => {
                          setHomePrice(500000);
                          setDownPayment(20);
                          setInterestRate(6.5);
                          setLoanTerm(30);
                        }}
                      >
                        Reset values
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="shadow-xl rounded-[1.75rem] border border-slate-200 overflow-hidden">
                  <CardHeader className="bg-white px-6 py-5">
                    <CardTitle className="text-xl font-semibold">Saved favorites</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6 bg-slate-50">
                    {savedProperties.length > 0 ? (
                      <div className="grid gap-4">
                        {savedProperties.map((property) => (
                          <div
                            key={property.id}
                            className={`rounded-3xl p-4 border ${property.id === selectedPropertyId ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 bg-white'}`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-900 truncate">{property.title}</p>
                                <p className="text-sm text-slate-500 truncate">{property.address}</p>
                                <p className="text-sm text-slate-600 mt-2">
                                  {property.beds} bd · {property.baths} ba · {property.sqft} sqft
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-slate-500">Price</p>
                                <p className="text-lg font-semibold text-slate-900">{formatCurrency(property.price)}</p>
                                <Button
                                  size="sm"
                                  variant={property.id === selectedPropertyId ? 'default' : 'outline'}
                                  className="mt-3"
                                  onClick={() => setSelectedPropertyId(property.id)}
                                >
                                  {property.id === selectedPropertyId ? 'Selected' : 'Use price'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-3xl bg-white p-6 shadow-sm">
                        <p className="font-semibold text-slate-900">No saved properties yet</p>
                        <p className="mt-2 text-sm text-slate-600">
                          Save properties from the listings page and return here to calculate your mortgage estimate.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="shadow-xl rounded-[1.75rem] border border-slate-200 overflow-hidden">
                  <CardHeader className="bg-white px-6 py-5">
                    <CardTitle className="text-xl font-semibold">Mortgage planning</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6 bg-slate-50">
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <h3 className="font-semibold text-slate-900">Loan term</h3>
                      <p className="text-sm text-slate-600 mt-2">Shorter terms reduce total interest but increase your monthly payment.</p>
                    </div>
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <h3 className="font-semibold text-slate-900">Rate sensitivity</h3>
                      <p className="text-sm text-slate-600 mt-2">Even a half-point rate change can meaningfully affect monthly costs.</p>
                    </div>
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <h3 className="font-semibold text-slate-900">Next step</h3>
                      <p className="text-sm text-slate-600 mt-2">Talk to a mortgage advisor for custom loan terms and exact closing costs.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="shadow-xl rounded-[1.75rem] border border-slate-200 overflow-hidden">
                  <CardHeader className="bg-white px-6 py-5">
                    <CardTitle className="text-xl font-semibold">Estimate details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 p-6 bg-slate-50">
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">Estimated monthly payment</p>
                      <p className="mt-3 text-3xl font-semibold text-slate-900">{formatCurrencyDecimal(monthlyPayment)}</p>
                    </div>
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">Total interest</p>
                      <p className="mt-3 text-2xl font-semibold text-orange-600">{formatCurrency(totalInterest)}</p>
                    </div>
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-500">Total payment</p>
                      <p className="mt-3 text-2xl font-semibold text-emerald-600">{formatCurrency(totalPayment)}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-xl rounded-[1.75rem] border border-slate-200 overflow-hidden">
                  <CardHeader className="bg-slate-950/95 text-white px-6 py-5">
                    <CardTitle className="text-xl font-semibold">Your mortgage breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5 p-6 bg-slate-50">
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Home price</span>
                        <span>{formatCurrency(homePrice)}</span>
                      </div>
                    </div>
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Down payment</span>
                        <span>{formatCurrency(homePrice * downPayment / 100)}</span>
                      </div>
                    </div>
                    <div className="rounded-3xl bg-white p-5 shadow-sm">
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Loan amount</span>
                        <span>{formatCurrency(homePrice - (homePrice * downPayment / 100))}</span>
                      </div>
                    </div>
                    <div className="rounded-3xl bg-slate-950/95 p-5 text-white">
                      <p className="text-sm text-slate-300">Important note</p>
                      <p className="mt-3 text-sm leading-6 text-slate-200">
                        This estimate covers principal and interest only. Taxes, insurance, PMI, and HOA fees are not included.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mortgage;
