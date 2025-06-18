"use client";

import Pending from "@/components/Pending";
import { collIdPosts, databases, dbIdNextDb } from "@/config/appwrite";
import { Post } from "@/lib/appwrite/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ShowPostId() {
  const [data, setData] = useState<Post | null>(null);
  const [pending, setPending] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    setPending(true);
    const getData = async () => {
      try {
        const data = await databases.getDocument(dbIdNextDb, collIdPosts, id as string);
        setData(data as Post);
      } catch {
        setData(null);
      } finally {
        setPending(false);
      }
    };
    getData();
  }, [id]);

  let content;
  if (pending) {
    content = <Pending />;
  } else {
    content = (
      <article>
        <h1 className="h1">{data?.title}</h1>
        <p>{data?.content}</p>
      </article>
    );
  }

  return (
    <section className="py-4 min-h-y">
      <div className="container">{content}</div>
    </section>
  );
}
