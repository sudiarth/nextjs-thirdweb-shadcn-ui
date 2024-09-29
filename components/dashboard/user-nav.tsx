import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";
import { optimismSepolia } from "thirdweb/chains"
import { client } from "@/lib/thirdweb/client";
import { useActiveAccount, useActiveWallet, useDisconnect, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { getBalance } from "thirdweb/extensions/erc20";
import { shortenAddress } from "thirdweb/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  const account = useActiveAccount();
  const {disconnect} = useDisconnect();
  const wallet = useActiveWallet();
  const address = process.env.THIRDWEB_TOKEN_CONTRACT_ADDRESS as string;

  const accountAddress = account?.address || ""

  const contract = getContract({
    client: client,
    chain: optimismSepolia,
    address: address
  });

  const { data: tokenbalance } = useReadContract(
    getBalance,
    {
        contract: contract,
        address: accountAddress
    }
  )

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium leading-none">
              {tokenbalance?.displayValue + " " + tokenbalance?.symbol} </p>
            </div>
            <DropdownMenuSeparator />
            <div className="flex items-center gap-4">
              <p className="text-xs leading-none text-muted-foreground">
                {shortenAddress(accountAddress, 11)}
              </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard" className="flex items-center">
              <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/account" className="flex items-center">
              <User className="w-4 h-4 mr-3 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer" onClick={() => disconnect(wallet!)}>
            <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}