"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/dashboard/user-nav";
import { SheetMenu } from "@/components/dashboard/sheet-menu";
import { inAppWallet } from "thirdweb/wallets";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { optimismSepolia } from "thirdweb/chains"
import { client } from "@/lib/thirdweb/client";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const account = useActiveAccount();
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 light:shadow-secondary dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          {!account ? (
          <>
          <div className="flex justify-center mr-2">
            <ConnectButton
              client={client}
              theme={"dark"}
              accountAbstraction={{
                chain: optimismSepolia,
                sponsorGas: true,
              }}
              appMetadata={{
                name: "Example App",
                url: "https://example.com",
              }}
              wallets={[
                inAppWallet({
                    auth: {
                      options: [
                        "google",
                        "discord",
                        "telegram",
                        "email",
                        "x",
                        "passkey",
                        "phone",
                      ],
                    }
                })
              ]}
            />
            </div>
            <ModeToggle />
            </>
            ) : (
            <>
              <ModeToggle />
              <UserNav />
            </>
            )}
        </div>
      </div>
    </header>
  );
}