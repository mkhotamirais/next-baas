import Image from "next/image";
import Link from "next/link";
import c from "@/lib/content.json";

export default function LogoSupabase() {
  return (
    <Link href="/supabase">
      <Image
        src={c.logos[2].iconUrl}
        alt="logo supabase"
        width={20}
        height={20}
        className="size-8 object-contain object-center"
      />
    </Link>
  );
}
