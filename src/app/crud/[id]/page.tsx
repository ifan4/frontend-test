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
import { ChangeEvent, ObjectHTMLAttributes, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addVariant, updateVariant } from "@/globalState/variantReducer";
import { useAppSelector } from "@/globalState/store";
import { CreateObjectURL } from "@/helper";
import { toast, useToast } from "@/components/ui/use-toast";


    

export default function Details() {
    const router = useRouter()
    const {id} = useParams()

    const variants = useAppSelector(state=>state.variants)
    const existingVariant:variant[] = variants.filter(f=>f.id==id)

    const ref = useRef<HTMLInputElement>(null)
    const [data, setData] = useState<variant>({
        id: existingVariant[0].id,
        image: '',
        image_file: existingVariant[0].image_file,
        sku: existingVariant[0].sku,
        colour: existingVariant[0].colour,
        stock: existingVariant[0].stock,
        weight: existingVariant[0].weight,
        status: existingVariant[0].status
    })
    const { toast } = useToast()
    const [selectedFile, setSelectedFile] = useState<File | any>(existingVariant[0].image_file)
    const [preview, setPreview] = useState<File | Blob | MediaSource | any>(existingVariant[0].image_file)

    const dispatch = useDispatch()


    useEffect(() => {
        if (!selectedFile || !selectedFile) {
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        // // free memory when ever this component is unmounted
        // return () => URL.revokeObjectURL(objectUrl)
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
        setSelectedFile(files[0])
        setData({
            ...data,
            image_file: files[0] 
          });
        console.log('files')
        console.log(files)
    }

    const onUpdate = async() => {
        try {
            
            dispatch(updateVariant(data))
            toast({
                variant: "default",
                title: "Data Successfully Updated!",
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
                                    (selectedFile || preview)
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
                                <option value="enable">enabled</option>
                                <option value="disable">disabled</option>
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
                onClick={onUpdate}
                >
                    <span>Update Variant</span>
                </Button>
                <Button 
                className="p-4"
                variant={'ghost'}
                onClick={()=>router.back()}
                >
                    <span>Cancel</span>
                </Button>
            </div>
        </div>
    )
}