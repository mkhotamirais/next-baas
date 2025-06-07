"use client";

import { bucketIdNextBucket, collIdPosts, databases, dbIdNextDb, storage } from "@/config/appwrite";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useAppwriteStore } from "@/lib/appwrite/store";
import { Post } from "@/lib/appwrite/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function ModalDelId({ item }: { item: Post }) {
  const { posts, setPosts } = useAppwriteStore();
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const deletePost = async () => {
    try {
      setPending(true);
      if (item.bannerId) {
        await storage.deleteFile(bucketIdNextBucket, item.bannerId);
      }
      await databases.deleteDocument(dbIdNextDb, collIdPosts, item.$id);

      if (posts) {
        const updatedPosts = posts.filter((post) => post.$id !== item.$id);
        setPosts(updatedPosts);
      }

      toast.success("Post berhasil dihapus");

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} size={"sm"}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {item?.title}</DialogTitle>
          <DialogDescription>This action cannot be undone, Are you sure?</DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Button variant={"destructive"} onClick={deletePost}>
            {pending ? "Deleting..." : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
