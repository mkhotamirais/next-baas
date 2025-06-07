"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { firestore } from "@/config/firebase";
import { Textarea } from "@/components/ui/textarea";
import { PostSchema } from "@/lib/firebase/rules";

type PostType = z.infer<typeof PostSchema>;

export default function CreatePost() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<PostType>({
    resolver: zodResolver(PostSchema),
    defaultValues: { title: "", content: "" },
  });

  const onSubmit = async (values: PostType) => {
    setPending(true);
    try {
      await addDoc(collection(firestore, "posts"), values);
      toast.success("Create post success");
      router.push("/firebase/posts");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="py-4 min-h-y">
      <div className="container">
        <div className="max-w-xl">
          <h1 className="h1">Create Post</h1>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input disabled={pending} placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea disabled={pending} placeholder="Content" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">
                  {pending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
