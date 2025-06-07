import Image from "next/image";
import Link from "next/link";

export default function LogoAppwrite() {
  return (
    <Link href="/appwrite">
      <Image
        src="https://raw.githubusercontent.com/homarr-labs/dashboard-icons/main/svg/appwrite.svg"
        alt="logo appwrite"
        width={20}
        height={20}
        className="size-8 object-contain object-center"
      />
    </Link>
  );
}
