import { NextApiResponse } from "next";
import { feature } from "../../../../types/interfaces";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest, res:NextApiResponse) {
    const features:feature[] = [
        {
            image: 'gift1.png',
            title: 'Never miss a gifting occasion',
            description: "Untukmu's AI swiftly organises your notable gifting events in one app. Timely gifting delivery scheduled, all with a sync of your online calendar."
        },
        {
            image: 'gift2.png',
            title: 'Personalised Gift Catalogue',
            description: "We delight in carefully curating unique gift ideas for you. From boutique blogshops to gift ideas for all occasions, we offer customisable packaging for a personal touch."
        },
        {
            image: 'gift3.png',
            title: 'Gift sharing',
            status: 'Coming Soon',
            description: "Want to pool a few friends to get that perfect gift for that special someone? No gift is out of bounds with Untukmu Easy Gift Sharing System."
        },
        {
            image: 'gift4.png',
            title: 'Incognito Gifting',
            description: "Wanna be as mysterious as Santa Klaus? Switch on Incognito gifting and our processes will simply take over by simply notifying your lucky recipient via text."
        },
        {
            image: 'gift5.png',
            title: 'Private Wishlist',
            description: "Add gifts to your private wishlist so that your friends don’t have to scramble to guess what to give you. It’s a win-win!"
        },
    ]
    
    return new Response(JSON.stringify(features))
}

