import Image from "next/image";
import Link from "next/link";
import c from "@/lib/content.json";

export default function LogoFirebase() {
  return (
    <Link href="/appwrite">
      <Image
        src={c.logos[1].iconUrl}
        alt="logo firebase"
        width={20}
        height={20}
        className="size-8 object-contain object-center"
      />
    </Link>
  );
}
