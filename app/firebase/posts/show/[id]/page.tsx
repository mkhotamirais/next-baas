"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { Post } from "@/lib/firebase/types";
import Pending from "@/components/Pending";

export default function ShowPostId() {
  const [data, setData] = useState<Post | null>(null);
  const [pendingData, setPendingData] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    setPendingData(true);
    const getData = async () => {
      try {
        if (!id) return;
        const docRef = doc(firestore, "posts", id?.toString() ?? "");
        const docSnap = await getDoc(docRef);
        setData(docSnap.data() as Post);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      } finally {
        setPendingData(false);
      }
    };
    getData();
  }, [id]);

  let content = null;
  if (pendingData) {
    content = <Pending />;
  } else {
    content = (
      <>
        <h1 className="h1">{data?.title}</h1>
        <p>{data?.content}</p>
      </>
    );
  }

  return (
    <section className="min-h-y py-4">
      <div className="container">{content}</div>
    </section>
  );
}
