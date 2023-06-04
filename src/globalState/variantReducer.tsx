'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { variant } from '../../types/interfaces'
import {v4 as v4uuid} from 'uuid'
import { getBase64 } from '@/helper'

const initialState: variant[] = [
    {
        id: '12n3on12ojnejo1b2-asd',
        image: 'ini_file.jpeg',
        sku: '123',
        colour: 'white',
        stock: 12,
        weight: 1000,
        status: 'enabled'
    },
    {
    id: 'ajsncjasnd-andjbduib',
    image: 'ini_file2.jpeg',
    sku: '124',
    colour: 'green',
    stock: 12,
    weight: 600,
    status: 'enabled'
    },
]

// const initialState: variant[] = JSON.parse(localStorage.getItem('variants')) || initialStateDefault 

const variantSlice = createSlice({
    name: 'variants',
    initialState,
    reducers: {
        addVariant:(state, action:PayloadAction<variant>) => {
            try {
                action.payload.id = v4uuid()
                state.push(action.payload)
                
            }
            finally{
                // localStorage.setItem('variants', JSON.stringify(state.map((item)=>item)))
            }
        },
        updateVariant:(state, action:PayloadAction<variant>) => {
            try {
                let uu = state.find(user=> user.id == action.payload.id)
                if (uu) {
                    uu.id = action.payload.id
                    uu.image_file = action.payload.image_file
                    uu.colour = action.payload.colour
                    uu.sku = action.payload.sku
                    uu.status = action.payload.status
                    uu.stock = action.payload.stock
                    uu.weight = action.payload.weight
                }
            } 
            finally{
                // localStorage.setItem('variants', JSON.stringify(state.map((item)=>item)))
            }
            
        },
        deleteVariant:(state, action:PayloadAction<string>)=>{
        
            const id = action.payload
            const uu = state.find(user=> user.id == id)

            if (uu){
                return state.filter(f=> f.id !== id)
            }
            // return localStorage.setItem('variants', JSON.stringify(state.filter(f=> f.id !== id)))
    

            
            
            
        }
    }
})

export default variantSlice.reducer
export const { addVariant, deleteVariant, updateVariant } = variantSlice.actions