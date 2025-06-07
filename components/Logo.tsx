import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/logo-mkhotami.png" alt="logo mkhotami" width={20} height={20} className="size-8" />
    </Link>
  );
}
