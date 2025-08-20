import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calculator, RefreshCw } from "lucide-react";

interface MathCaptchaProps {
  onSolved: () => void;
  onFailed: () => void;
}

export function MathCaptcha({ onSolved, onFailed }: MathCaptchaProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [userAnswer, setUserAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const operators = ["+", "-", "*"];
  const maxAttempts = 3;

  const generateProblem = () => {
    const op = operators[Math.floor(Math.random() * operators.length)];
    let n1, n2;

    switch (op) {
      case "+":
        n1 = Math.floor(Math.random() * 50) + 1;
        n2 = Math.floor(Math.random() * 50) + 1;
        break;
      case "-":
        n1 = Math.floor(Math.random() * 50) + 20;
        n2 = Math.floor(Math.random() * n1);
        break;
      case "*":
        n1 = Math.floor(Math.random() * 10) + 1;
        n2 = Math.floor(Math.random() * 10) + 1;
        break;
      default:
        n1 = 1;
        n2 = 1;
    }

    setNum1(n1);
    setNum2(n2);
    setOperator(op);
    setUserAnswer("");
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const getCorrectAnswer = () => {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      default:
        return 0;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userNum = parseInt(userAnswer);
    const correctAnswer = getCorrectAnswer();

    if (userNum === correctAnswer) {
      setTimeout(() => {
        onSolved();
      }, 500);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= maxAttempts) {
        setTimeout(() => {
          onFailed();
        }, 500);
      } else {
        generateProblem();
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Calculator className="h-5 w-5" />
          <span>Solve to Continue</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Solve this math problem to claim your earning
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Math Problem Display */}
          <div className="text-center">
            <div className="bg-muted/50 rounded-lg p-6">
              <div className="text-4xl font-bold text-primary mb-4">
                {num1} {operator} {num2} = ?
              </div>
              <p className="text-sm text-muted-foreground">
                What is the answer?
              </p>
            </div>
          </div>

          {/* Answer Input */}
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Enter your answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="text-center text-2xl font-bold"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Attempts Counter */}
          <div className="text-center text-sm text-muted-foreground">
            Attempts: {attempts}/{maxAttempts}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={generateProblem}
              disabled={isSubmitting}
              className="flex-1"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              New Problem
            </Button>
            <Button
              type="submit"
              disabled={!userAnswer || isSubmitting}
              className="flex-1 gradient-primary"
            >
              {isSubmitting ? "Checking..." : "Submit"}
            </Button>
          </div>

          {/* Warning for remaining attempts */}
          {attempts > 0 && attempts < maxAttempts && (
            <div className="text-center text-sm text-warning">
              ⚠️ Wrong answer! {maxAttempts - attempts} attempts remaining
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
