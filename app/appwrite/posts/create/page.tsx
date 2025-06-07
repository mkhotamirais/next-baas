"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { bucketIdNextBucket, collIdPosts, databases, dbIdNextDb, ID, storage } from "@/config/appwrite";
import { PostSchema } from "@/lib/appwrite/rules";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

type Post = z.infer<typeof PostSchema>;

export default function CreatePost() {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<Post>({
    resolver: zodResolver(PostSchema),
    defaultValues: { title: "", content: "", image: undefined },
  });

  const onSubmit = async (values: Post) => {
    const { title, content, image } = values;
    setPending(true);

    try {
      let bannerId = null;
      if (image) {
        const bucket = await storage.createFile(bucketIdNextBucket, ID.unique(), image);
        bannerId = bucket.$id;
      }
      await databases.createDocument(dbIdNextDb, collIdPosts, ID.unique(), { title, content, bannerId });
      toast.success("Post berhasil dibuat");
      router.push("/appwrite/posts");
      router.refresh();
      form.reset({ title: "", content: "", image: undefined });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);
      }
    } finally {
      setPending(false);
    }
  };
  return (
    <section className="min-h-y py-4">
      <div className="container">
        <div className="mb-4">
          <h1 className="h1">Create Post</h1>
        </div>
        <div className="max-w-xl">
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
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        ref={inputRef}
                        disabled={pending}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const fileUrl = URL.createObjectURL(file);
                            setPreview(fileUrl);
                            field.onChange(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {preview && (
                <div className="relative w-fit">
                  <Image src={preview} alt="preview" width={200} height={200} />
                  <Button
                    type="button"
                    disabled={pending}
                    size="icon"
                    className="absolute right-0 top-0 m-2"
                    onClick={() => {
                      setPreview(undefined);
                      form.setValue("image", undefined);
                      if (inputRef.current) inputRef.current.value = "";
                    }}
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              )}
              <Button disabled={pending} type="submit">
                {pending ? "Loading..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
