"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Trash, MoreHorizontal,Eye } from "lucide-react"
import { useDispatch } from "react-redux"
import { deleteVariant } from "@/globalState/variantReducer"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"



export function Dropdown_Menu({id}:{id:string}) {
    const {toast} = useToast()
    const router = useRouter()
    const dispatch = useDispatch()


    const onDelete = (id:string) => {
        return dispatch(deleteVariant(id))
        return toast({
          variant: "default",
          title: "Data Deleted!",
        })  
        
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
            <MoreHorizontal/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem 
        role="button" 
        onClick={()=>router.push(`/crud/${id}`)}
        className=" p-5 z-40">
            <Eye className="mr-2 h-4 w-4"/>
            <span>See Details</span>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem 
        role="button"
        onClick={()=>onDelete(id)}
        className=" text-red-600 p-5 z-40">
            <Trash className="mr-2 h-4 w-4"/>
            <span>Delete</span>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
