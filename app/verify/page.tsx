import { type ReactElement } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import { buttonVariants } from "../../components/ui/button";
import Link from "next/link";

export interface pageProps {}

export default function VerifyPage({}: pageProps): ReactElement {
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center">
        <Card className="w-[380px] px-5 ">
          <CardHeader className="flex flex-col items-center text-center">
            <div className="mb-2 mx-auto flex size-20 items-center rounded-full justify-center bg-blue-100">
              <Mail className="size-12 text-blue-500" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Check your Email
            </CardTitle>
            <CardDescription>
              We have sent a verification link to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 rounded-md bg-yellow-50 border-yellow-300 p-4">
              <div className="flex items-center justify-center gap-2">
                <AlertCircle className="size-5 text-yellow-400" />
                <p className="text-sm font-medium text-yellow-800">
                  Be sure to check your spam folder!
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href="/"
              className={buttonVariants({
                className: "w-full",
                variant: "outline",
              })}
            >
              <ArrowLeft className="size-4 mr-2" /> Back to Home
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
