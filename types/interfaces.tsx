export interface feature{
    image: string;
    title: string;
    status?: 'Coming Soon' | null
    description: string;
}

export interface variant{
    id: string;
    image: string;
    image_file?: File | null |undefined;
    sku: string;
    colour: string;
    stock: number;
    weight: number;
    status: 'enabled' | 'disabled'
}



