"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Moon, Rss, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import Container from "@/app/components/container";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { NAVLINKS } from "@/app/lib/constants";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header
      role="banner"
      className="flex flex-shrink-0 z-10 sticky top-0 h-14 sm:h-16 md:h-20 transition-colors motion-reduce:transition-none"
    >
      <Container className="flex items-center w-full">
        <Link
          className="flex place-items-center gap-2 text-primary font-serif shrink-0 font-bold text-3xl"
          href="/"
        >
          {/* Chima Ilo */}
          <Image
            src="/logo.png"
            alt="Chima Ilo Website Logo"
            width={40}
            height={40}
            priority
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4 ml-4 md:ml-12 justify-end w-full">
          {/* Nav menu */}
          <NavigationMenu className="hidden sm:block mr-12">
            <NavigationMenuList>
              {NAVLINKS.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <Link href={`/${link.link}`} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn("capitalize", navigationMenuTriggerStyle())}
                    >
                      {link.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {/* RSS link */}
          <Button variant="ghost" size="icon" asChild aria-label="Toggle Theme">
            <Link
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              aria-labelledby="rss-title"
            >
              <Rss className="w-6 h-6">
                <title id="rss-title">RSS Feed</title>
              </Rss>
            </Link>
          </Button>
          {/* light/dark mode toggle button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Moon className="w-6 h-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Sun className="w-6 h-6 rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle Theme</span>
          </Button>
          {/* SideMenu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Menu"
                className="sm:hidden"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="mt-16">
                <ul>
                  {NAVLINKS.map((item, index) => (
                    <Link
                      key={index}
                      href={`/${item.link}`}
                      className="text-lg p-4 sm:px-6 my-4 capitalize leading-none transition-colors block"
                    >
                      {item.name}
                    </Link>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
