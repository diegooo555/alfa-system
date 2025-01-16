import Image from "next/image";
import Link from "next/link";
import styles from "../home.module.css"

interface LinkPerformProps {
  href: string; // La URL de destino debe ser una cadena.
  content: string | React.ReactNode; // El contenido puede ser texto o un nodo React.
}

const LinkPerform = ({ href, content }: LinkPerformProps) => {
  return (
    <Link
      href={href}
      className={`${styles.itim} text-blue-500 text-xl font-bold no-underline p-3 hover:scale-110`}
    >
      {content}
    </Link>
  );
};

export default function Menu() {
  return (
    <nav className="flex items-center justify-around  rounded-md w-full max-sm:hidden z-10">
      <Link href="/" className="hover:scale-105">
      <Image
          src="/wolf.png"
          alt="Logo"
          width={100}
          height={100}
          priority={true}
        />
      </Link>
      <LinkPerform href="/" content="INICIO" />
      <LinkPerform href="/tasks" content="TASKS" />
      <LinkPerform href="/finance" content="FINANZAS" />
      <LinkPerform href="/companys" content="COMPANYS" />
      <LinkPerform href="/projects" content="PROJECTS" />
    </nav>
  );
}
