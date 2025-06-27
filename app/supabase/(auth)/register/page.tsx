"use client";

import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { supabase } from "@/config/supabase";
import { useSupabaseStore } from "@/lib/supabase/store";
import { RegisterSchema } from "@/lib/supabase/rules";

export default function Register() {
  const [load, setLoad] = useState(false);
  const { setUser } = useSupabaseStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setLoad(true);
    const { name, email, password } = values;

    try {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
      if (error && process.env.NODE_ENV === "development") {
        console.log(error);
      }

      setUser(data?.user);

      form.reset();
      router.push("/supabase/dashboard");
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
            <h1 className="h1">Register</h1>
            <p>
              Already have an account?{" "}
              <Link href="/appwrite/login" className="link">
                Login
              </Link>
            </p>
            {/* form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={load || (form.formState.isSubmitted && !form.formState.isValid)}>
                  Register
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
