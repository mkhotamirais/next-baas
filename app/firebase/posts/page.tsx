"use client";

import { Button } from "@/components/ui/button";
import { firestore } from "@/config/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeletePost from "./DeletePost";
import { useFirebaseStore } from "@/lib/firebase/store";
import { Post } from "@/lib/firebase/types";
import Pending from "@/components/Pending";

export default function Posts() {
  const { posts, setPosts } = useFirebaseStore();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setPending(true);

        const q = query(collection(firestore, "posts"));
        const querySnapshot = await getDocs(q);
        const filteredData = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setPosts(filteredData as Post[]);
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    };
    getData();
  }, [setPosts]);

  let content = null;
  if (pending) {
    content = <Pending />;
  } else {
    content = (
      <div className="my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-md bg-card">
            <Link href={`/posts/show/${post.id}`}>
              <h3 className="h3">{post.title}</h3>
            </Link>
            <p>{post.content}</p>
            <div className="flex gap-2">
              <Link href={`/firebase/posts/edit/${post.id}`}>
                <Button size={"sm"}>edit</Button>
              </Link>
              <DeletePost item={post} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <section className="min-h-y">
      <div className="container">
        <h1 className="h1">Posts</h1>
        <Link href="/firebase/posts/create">
          <Button>create post</Button>
        </Link>
        {content}
      </div>
    </section>
  );
}
