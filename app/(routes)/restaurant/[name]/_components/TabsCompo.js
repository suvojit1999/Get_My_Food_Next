'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuSection from './MenuSection'
import ReviewSection from './ReviewSection'


const TabsCompo = ({Restaurant}) => {
    return (
        <div>
            <Tabs defaultValue="category" className="w-full ml-1">
                <TabsList>
                    <TabsTrigger value="category">Category</TabsTrigger>
                    <TabsTrigger value="aboutus">About Us</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="category">
                    <MenuSection Restaurant={Restaurant}/>
                </TabsContent>
                <TabsContent value="aboutus">{Restaurant?.aboutUs}</TabsContent>
                <TabsContent value="reviews">
                    <ReviewSection Restaurant={Restaurant}/>
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default TabsCompo
