"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ADMIN_ACCOUNTS = [
  {
    email: "gaurav@giftandbeeyond.com",
    password: "Beeyond@25",
    role: "Admin",
    name: "Gaurav",
  },
  {
    email: "rahul@touchwoodbliss.com",
    password: "Beeyond@25",
    role: "Admin",
    name: "Rahul",
  },
];

const AdminLoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");


  useEffect(()=>{
    const storedAdmin = localStorage.getItem("adminUser");
    if(storedAdmin) router.push('/admin')
  },[router]);

  const handleLogin = ({ email, password }) => {
    const matcheduser = ADMIN_ACCOUNTS.find(
      (account) => account.email === email && account.password === password
    );

    if (matcheduser) {
      localStorage.setItem("adminUser",JSON.stringify(matcheduser));
      setIsAuthenticated(true);
      setCurrentUser(matcheduser);
      setLoginError("");
      router.push("/admin");
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      handleLogin({ email, password });
    } catch (error) {
      console.error("Error signing in", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
              <svg
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 4.5C4 5.02384 4.11743 5.53557 4.33772 6H2C1.44772 6 1 6.44772 1 7V12C1 12.5523 1.44772 13 2 13H3V21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V13H22C22.5523 13 23 12.5523 23 12V7C23 6.44772 22.5523 6 22 6H19.6623C19.8826 5.53557 20 5.02384 20 4.5C20 3.57174 19.6313 2.6815 18.9749 2.02513C18.3185 1.36875 17.4283 1 16.5 1C15.1769 1 14.1209 1.37202 13.3032 1.97769C12.7384 2.39606 12.316 2.90438 12 3.42396C11.684 2.90438 11.2616 2.39606 10.6968 1.97769C9.87913 1.37202 8.82309 1 7.5 1C6.57174 1 5.6815 1.36875 5.02513 2.02513C4.36875 2.6815 4 3.57174 4 4.5ZM7.5 3C7.10218 3 6.72064 3.15804 6.43934 3.43934C6.15804 3.72064 6 4.10218 6 4.5C6 4.89782 6.15804 5.27936 6.43934 5.56066C6.72064 5.84196 7.10218 6 7.5 6H10.8745C10.8032 5.66322 10.6934 5.2833 10.5256 4.91036C10.2937 4.39508 9.96597 3.92528 9.50633 3.58481C9.05837 3.25298 8.42691 3 7.5 3ZM13.1255 6H16.5C16.8978 6 17.2794 5.84196 17.5607 5.56066C17.842 5.27936 18 4.89782 18 4.5C18 4.10218 17.842 3.72064 17.5607 3.43934C17.2794 3.15804 16.8978 3 16.5 3C15.5731 3 14.9416 3.25298 14.4937 3.58481C14.034 3.92528 13.7063 4.39508 13.4744 4.91036C13.3066 5.2833 13.1968 5.66322 13.1255 6ZM13 8V11H21V8H13ZM11 8V11H3V8H11ZM13 20H19V13H13V20ZM11 13V20H5V13H11Z"
                  fill="#000000"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold">Gift & Beeyond</h1>
          <p className="text-muted-foreground">
            Sign to GIFT & BEEYOND management system
          </p>
        </div>

        <Card className="shadow-lg px-3">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          {loginError && (
            <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          <CardContent className="space-y-2 mt-5">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;
