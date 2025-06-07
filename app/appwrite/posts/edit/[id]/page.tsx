"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { bucketIdNextBucket, collIdPosts, databases, dbIdNextDb, ID, storage } from "@/config/appwrite";
import { PostSchema } from "@/lib/appwrite/rules";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Loading from "@/components/Loading";

type Post = z.infer<typeof PostSchema>;

export default function EditPostId() {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const [existingBannerId, setExistingBannerId] = useState<string | null>(null);
  const [pendingData, setPendingData] = useState(false);
  const [previewCurrentImage, setPreviewCurrentImage] = useState<string | undefined>(undefined);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const postId = params.id as string;

  const form = useForm<Post>({
    resolver: zodResolver(PostSchema),
    defaultValues: { title: "", content: "", image: undefined },
  });

  useEffect(() => {
    setPendingData(true);
    const getData = async () => {
      try {
        const res = await databases.getDocument(dbIdNextDb, collIdPosts, postId);
        form.setValue("title", res.title);
        form.setValue("content", res.content);
        if (res.bannerId) {
          // const filePreview = (storage.getFileView(bucketIdNextBucket, res.bannerId).href as string) + "&mode=admin";
          const filePreview = storage.getFileView(bucketIdNextBucket, res.bannerId);
          setPreviewCurrentImage(filePreview as string);
          setExistingBannerId(res.bannerId);
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setPendingData(false);
      }
    };
    getData();
  }, [form, postId]);

  const onSubmit = async (values: Post) => {
    const { title, content, image } = values;
    setPending(true);

    try {
      let newBannerId = existingBannerId;
      if (image) {
        if (existingBannerId) {
          await storage.deleteFile(bucketIdNextBucket, existingBannerId);
        }
        const bucket = await storage.createFile(bucketIdNextBucket, ID.unique(), image);
        newBannerId = bucket.$id;
      }
      await databases.updateDocument(dbIdNextDb, collIdPosts, postId, { title, content, bannerId: newBannerId });
      toast.success("Post berhasil diupdate");
      router.push("/appwrite/posts");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(error.message);
      }
    } finally {
      setPending(false);
    }
  };

  let content = null;
  if (pendingData) {
    content = <Loading />;
  } else {
    content = (
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
            {previewCurrentImage && (
              <Image src={previewCurrentImage} alt="previewCurrentImage" width={200} height={200} unoptimized />
            )}
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
                <Image src={preview} alt="preview" width={200} height={200} unoptimized />
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
              {pending ? "Loading..." : "Update"}
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <section className="min-h-y py-4">
      <div className="container">
        <div className="mb-4">
          <h1 className="h1">Update Post</h1>
        </div>
        {content}
      </div>
    </section>
  );
}
