"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SpinnerCircle1 from "@/components/ui/spinner-07";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { BusFront, ChevronRight } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const formSubmitted = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setPending(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });
      if (res?.error) {
        setErrorMessage(res.error);
        setPending(false);
      } else {
        setPending(false);
        // Handle successful login here (e.g., redirect or store user data)
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login");
      setPending(false);
    }
  };

  return (
    <div>
      {pending && (
        <div className="z-50 fixed top-0 left-0 w-full h-full bg-gray-50/40 justify-items-center content-center border-b border-gray-200">
          <SpinnerCircle1 />
        </div>
      )}
      <div className="grid min-h-svh lg:grid-cols-2">
        {/* <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="flex items-center justify-center py-12 bg-secondary-600">
        <div className="mx-auto grid max-w-6xl gap-12">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Inatale Admin Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your official username below to login to your account
            </p>
          </div>
          <form onSubmit={formSubmitted} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="user"
                required
                className="bg-secondary-100 border-secondary-900"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                className="bg-secondary-100 border-secondary-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <LoginButton pending={pending} />
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <BookAlert className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Forgot Password?{" "}
            <Link href="#" className="underline">
              Contact Admin
            </Link>
          </div>
        </div>
      </div>
      <div
        className=" bg-primary-600 flex flex-1 items-center justify-center"
      >
        <div className="flex flex-col items-center text-center">
          <img src='vercel.svg' className=" lg:w-96"  />
          <Link href="#" className="mt-4 text-muted-foreground underline">
            Go to Website
          </Link>
        </div>
      </div>
    </div> */}
        <div className="relative hidden bg-muted lg:block">
          <img
            src="/collage.jpg"
            alt="Image"
            className="absolute   inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <form
                onSubmit={formSubmitted}
                className="flex flex-col gap-6"
                method="post"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  {/*  <h1 className="text-2xl font-bold">Fleet Management System</h1> */}
                  <div className="flex h-8 items-end space-x-1">
                    <BusFront
                      className="h-8 w-8 text-mytheme"
                      color="black"
                      fill="green"
                    />
                    <h1 className="text-2xl font-bold">
                      Fleet Management Login
                    </h1>
                  </div>
                  <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="username"
                      id="username"
                      type="email"
                      placeholder="m@example.com"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      {/* <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a> */}
                    </div>
                    <Input
                      name="password"
                      id="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-800">
                    Login
                  </Button>
                  <div className="flex items-center">
                    {errorMessage && (
                      <>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                        <span>&nbsp;</span>
                        <p className="text-sm text-red-500">{errorMessage}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-center text-xs">
                  <p className="text-muted-foreground text-black-900 dark:text-white italic">
                    Powered by Aureolesofti
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type LoginButtonProps = {
  pending: boolean;
};

function LoginButton({ pending }: LoginButtonProps) {
  return (
    <Button
      className="mt-4 w-full bg-primary-600 text-secondary-50"
      aria-disabled={pending}
    >
      Log in <ChevronRight className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

export default Login;
