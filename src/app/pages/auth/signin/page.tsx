"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { signIn } from "next-auth/react";
import { useToast } from "../../../../components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const SignIn: React.FC = () => {
  const session = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session.status, router]);
  const handleLoginForm = async (e?: any) => {
    e?.preventDefault();
    console.log("Attempting sign in with:", { username, password });
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (!result) {
        toast({
          variant: "destructive",
          title: "Sign In Failed",
          description: "Something went wrong Please try again",
          duration: 5000,
        });
        console.log(result);
        return;
      }

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Sign in failed: ${result.error}`,
          duration: 5000,
        });
        console.error(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: error?.message,
        variant: "destructive",
      });
      console.error(error);
    }
  };

  if (session.status === "authenticated") {
    return;
  }

  return (
    <div className="w-full flex justify-center items-center m-auto">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Sign In</TabsTrigger>
          <TabsTrigger value="password">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                A new World Is waiting for you to be explored.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={username}
                  id="email"
                  placeholder="jonedoe@mail.com"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="your password"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleLoginForm()}>Sign In</Button>
              <Button onClick={() => signIn("google")}>
                Sign In with Google
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you`&apos;`ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignIn;
