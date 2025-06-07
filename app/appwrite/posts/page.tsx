"use client";

import { bucketIdNextBucket, collIdPosts, databases, dbIdNextDb, storage } from "@/config/appwrite";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/appwrite/types";
import { Query } from "appwrite";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalDelId from "./ModalDelId";
import { useAppwriteStore } from "@/lib/appwrite/store";
import Loading from "@/components/Loading";

export default function Posts() {
  const { posts, setPosts } = useAppwriteStore();
  const [pendingData, setPendingData] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setPendingData(true);
        const data = await databases.listDocuments(dbIdNextDb, collIdPosts, [Query.orderDesc("$createdAt")]);
        setPosts(data?.documents as Post[]);
      } catch (error) {
        console.log(error);
      } finally {
        setPendingData(false);
      }
    };
    getData();
  }, [setPosts]);

  let content = null;
  if (pendingData) {
    content = <Loading />;
  } else {
    content = (
      <div className="py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts?.map((post) => (
          <div key={post.$id} className="bg-card rounded-md overflow-hidden shadow-md">
            <Image
              // src={`${storage.getFileView(bucketIdNextBucket, post.bannerId)}&mode=admin`}
              src={`${storage.getFileView(bucketIdNextBucket, post.bannerId)}`}
              alt={post?.title || "image alt"}
              width={200}
              height={200}
              className="object-cover object-center h-40 w-full"
              unoptimized
            />
            <article className="p-4">
              <Link href={`/posts/show/${post.$id}`}>
                <h3 className="h3">{post.title}</h3>
              </Link>
              <p className="text-muted-foreground">{post.content}</p>
            </article>
            <div className="p-3 flex gap-2">
              <Link href={`/appwrite/posts/edit/${post.$id}`}>
                <Button size={"sm"}>Edit</Button>
              </Link>
              <ModalDelId item={post} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="min-h-y py-4 bg-secondary">
      <div className="container">
        <h1 className="h1">Posts</h1>
        <Link href="/appwrite/posts/create">
          <Button>Create Post</Button>
        </Link>
        {content}
      </div>
    </section>
  );
}
