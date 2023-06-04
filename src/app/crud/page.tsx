'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { variant } from "../../../types/interfaces"
import { Dropdown_Menu } from "./dropdown-menu"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ImageOff, PlusCircle } from 'lucide-react'
import { useAppSelector } from "@/globalState/store"
import { CreateObjectURL } from "@/helper"


  
  export default function Crud() {
    const router = useRouter()
    const variants = useAppSelector(state=>state.variants)

    
    
    return (
      <div className="md:container space-y-3">
        {/* {JSON.stringify(data)} */}
        <div className="flex justify-between mt-7">
          <h3>Variants Data</h3>
          <Button
          className="bg-orange-400 text-white" 
          onClick={()=>router.push('/crud/add')}
          >
            <PlusCircle className="mr-1 w-4 h-4"/>
            <span>Add Data</span>
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Colour</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Weight (in g)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant,key) => (
              <TableRow 
              key={key} 
              >
                <TableCell className="font-medium">
                  {
                    
                      (variant.image_file && variant.image_file.size) 
                      ?  <img src={CreateObjectURL(variant.image_file)} className="object-contain w-12"/>
                      :  <ImageOff/>
                  }
                </TableCell>
                <TableCell>{variant.sku}</TableCell>
                <TableCell>{variant.colour}</TableCell>
                <TableCell>{variant.stock}</TableCell>
                <TableCell>{variant.weight}</TableCell>
                <TableCell>{variant.status}</TableCell>
                <TableCell>
                  <Dropdown_Menu id={variant.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  

