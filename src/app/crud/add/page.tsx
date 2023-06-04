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
import { variant } from "../../../../types/interfaces";
import { Button } from "@/components/ui/button";
import { PlusCircle, ImagePlus, XCircle } from 'lucide-react'
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addVariant } from "@/globalState/variantReducer";
import { toast, useToast } from "@/components/ui/use-toast";


    

export default function Details() {
    const router = useRouter()
    const ref = useRef<HTMLInputElement>(null)
    const [data, setData] = useState<variant>({
        id: '',
        image: '',
        image_file: null,
        sku: '',
        colour: '',
        stock: 0,
        weight: 0,
        status: 'enabled'
    })
    const [selectedFile, setSelectedFile] = useState<File[]>()
    const [preview, setPreview] = useState<File | Blob | MediaSource | any>()
    const {toast} = useToast()
    const dispatch = useDispatch()


    useEffect(() => {
        if (!selectedFile || !selectedFile[0]) {
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile[0])
        setPreview(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleClick = () => {
        ref?.current?.click()
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
      ) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
          });
      };

    const handleUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.currentTarget.files ?? [])
        setSelectedFile(files)
        setData({
            ...data,
            image_file: files[0] 
          });
    }

    const onSubmit = async() => {
        try {
            dispatch(addVariant(data))
            toast({
                variant: "default",
                title: "Data Successfully Added!",
              })  
            return router.push('/crud')
        } catch (error) {
            console.log(error);
            
        }
    }

    return(
        <div className="md:container space-y-3">
            <h3 className="text-3xl">Variant Details</h3>
         
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Colour</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div 
                            className="flex flex-col items-center justify-center gap-2 bg-violet-50 text-violet-500 rounded-lg hover:bg-violet-100 cursor-pointer w-18 h-18 p-4"
                            onClick={handleClick}
                            >
                                {
                                    selectedFile 
                                    ?  <img src={preview} className="object-contain w-12"/>
                                    :  <ImagePlus/>
                                }
                                <span className="sr-only">Choose profile photo</span>
                                <input 
                                name="image"
                                type="file" 
                                ref={ref} 
                                onChange={handleUploadChange}
                                className="hidden
                                "/>
                            </div>
                            {/* {variant.sku} */}
                        </TableCell>
                        <TableCell>
                            <input 
                            name="sku"
                            className="p-2 outline outline-2 outline-gray-300 focus:outline-slate-400"
                            type="text" 
                            onChange={handleChange}
                            value={data?.sku}/>
                        </TableCell>
                        <TableCell>
                            <input 
                            name="colour"
                            className="p-2 outline outline-2 outline-gray-300 focus:outline-slate-400"
                            type="text" 
                            onChange={handleChange}
                            value={data?.colour}/>
                        </TableCell>
                        <TableCell>
                            <input
                            name="stock"
                            className="p-2 outline outline-2 outline-gray-300 focus:outline-slate-400" 
                            type="number" 
                            onChange={handleChange}
                            value={data?.stock}/>
                        </TableCell>
                        <TableCell>
                            <input 
                            name="weight"
                            className="p-2 outline outline-2 outline-gray-300 focus:outline-slate-400"
                            type="number" 
                            onChange={handleChange}
                            value={data?.weight}/>
                        </TableCell>
                        <TableCell>
                            <select 
                            name="status"
                            className="p-2 outline outline-2 outline-gray-300 focus:outline-slate-400"
                            onChange={handleChange}
                            value={data?.status}
                            >
                                <option value="enable">enable</option>
                                <option value="disable">disable</option>
                            </select>
                        </TableCell>
                        <TableCell>
                    </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className="space-x-3">
                <Button 
                className="bg-orange-400 text-white"
                onClick={onSubmit}
                >
                    <PlusCircle className="mr-1 h-5 w-5"/>
                    <span>Add Variant</span>
                </Button>
                <Button 
                className="p-4"
                variant={'ghost'}
                onClick={()=>router.back()}
                >
                    <XCircle className="mr-1 h-5 w-5"/>
                    <span>Cancel</span>
                </Button>
            </div>
        </div>
    )
}