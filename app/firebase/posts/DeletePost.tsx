"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";
import { firestore } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { Post } from "@/lib/firebase/types";
import { useFirebaseStore } from "@/lib/firebase/store";

export default function DeletePost({ item }: { item: Post }) {
  const { posts, setPosts } = useFirebaseStore();
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const onDelete = async () => {
    setPending(true);
    try {
      await deleteDoc(doc(firestore, "posts", item.id));
      toast.success(`Delete ${item.title} success!`);
      setPosts(posts.filter((post) => post.id !== item.id));
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete <span className="italic text-destructive">{item.title}</span>, Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>This action cannot be undone!</DialogDescription>
          <div className="inline-flex justify-center sm:justify-start gap-2">
            <Button disabled={pending} variant="destructive" onClick={onDelete}>
              {pending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              Delete
            </Button>
            <DialogClose asChild>
              <Button disabled={pending} variant="outline" size={"sm"}>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
