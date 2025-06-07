"use client";

import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { account } from "@/config/appwrite";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/lib/appwrite/rules";
import { useAppwriteStore } from "@/lib/appwrite/store";

export default function Login() {
  const [load, setLoad] = useState(false);
  const { setUser } = useAppwriteStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setLoad(true);
    const { email, password } = values;

    try {
      await account.createEmailPasswordSession(email, password);
      setUser(await account.get());
      router.push("/appwrite/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message);
      }
    } finally {
      setLoad(false);
    }
  };

  return (
    <section className="bg-secondary min-h-y py-12">
      <div className="container">
        <div className="bg-background max-w-md mx-auto p-8 rounded-md shadow">
          <div className="">
            <h1 className="h1">Login</h1>
            <p>
              Do not have an account?{" "}
              <Link href="/appwrite/register" className="link">
                Register
              </Link>
            </p>
            {/* form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={load || (form.formState.isSubmitted && !form.formState.isValid)}>
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
