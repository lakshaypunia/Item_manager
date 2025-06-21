"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { uploadNewItem } from "@/lib/useractions/action"
import Image from "next/image"
// import { useItems } from "./contexts/items-context"

type formdatatype = {
    itemName: string
    itemType: string
    itemDescription: string;
    coverImage?: File | "";
    additionalImages: File[]
}

export default function AddItemPage() {
//   const { addItem } = useItems()
const [formData, setFormData] = useState<formdatatype>({
    itemName: "",
    itemType: "",
    itemDescription: "",
    coverImage: undefined,
    additionalImages: [],
})
  const [showSuccess, setShowSuccess] = useState(false)
  const [coverImagePreview, setCoverImagePreview] = useState<File | null>()
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<File[]>([])
  const[loading,setloading] = useState(false)

  const itemTypes = [
    "Shirt",
    "Pant",
    "Shoes",
    "Sports Gear",
    "Jacket",
    "Dress",
    "Accessories",
    "Underwear",
    "Socks",
    "Hat",
  ]

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
    setFormData((prev) => ({ ...prev, coverImage: file }))
    setCoverImagePreview(file)
    }
  }

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, ...files],
    }))
    setAdditionalImagePreviews(files)
  }

  const removeAdditionalImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }))
    setAdditionalImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const removeCoverImage = () => {
    setFormData((prev) => ({ ...prev, coverImage: undefined }))
    setCoverImagePreview(null);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setloading(true)
    e.preventDefault()
    console.log("Form submitted with data:", formData)

    // Add item to context
    const success = await uploadNewItem({
      itemName: formData.itemName,
      itemType: formData.itemType,
      itemDescription: formData.itemDescription,
      coverImage : coverImagePreview as unknown as File,
      additionalImages: additionalImagePreviews as unknown as File[],
    })

    if (!success) {
      console.error("Failed to add item")
      return
    }
    // Notify context about the new item
    

    // Show success message
    setShowSuccess(true)

    // Reset form
    setFormData({
      itemName: "",
      itemType: "",
      itemDescription: "",
      coverImage: undefined,
      additionalImages: [],
    })
    setCoverImagePreview(null)
    setAdditionalImagePreviews([])

    setloading(false)

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 5000)
  }

  const isFormValid = formData.itemName && formData.itemType && formData.itemDescription && formData.coverImage

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Item</h1>
          <p className="text-gray-600">Fill in the details below to add a new item to your inventory.</p>
        </div>

        {showSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">Item successfully added!</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Name */}
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name *</Label>
                <Input
                  id="itemName"
                  type="text"
                  placeholder="Enter item name"
                  value={formData.itemName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, itemName: e.target.value }))}
                  required
                />
              </div>

              {/* Item Type */}
              <div className="space-y-2">
                <Label htmlFor="itemType">Item Type *</Label>
                <Select
                  value={formData.itemType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, itemType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select item type" />
                  </SelectTrigger>
                  <SelectContent>
                    {itemTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Item Description */}
              <div className="space-y-2">
                <Label htmlFor="itemDescription">Item Description *</Label>
                <Textarea
                  id="itemDescription"
                  placeholder="Describe the item in detail..."
                  value={formData.itemDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, itemDescription: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <Label htmlFor="coverImage">Item Cover Image *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {coverImagePreview ? (
                    <div className="relative">
                      <img
                        src={coverImagePreview ? URL.createObjectURL(coverImagePreview) : "/placeholder.svg"}
                        alt="Cover preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={removeCoverImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Label htmlFor="coverImage" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">Upload cover image</span>
                          <span className="mt-1 block text-sm text-gray-500">PNG, JPG, GIF up to 10MB</span>
                        </Label>
                        <Input
                          id="coverImage"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleCoverImageChange}
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Images */}
              <div className="space-y-2">
                <Label htmlFor="additionalImages">Additional Images (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="mt-2">
                      <Label htmlFor="additionalImages" className="cursor-pointer">
                        <span className="text-sm font-medium text-gray-900">Upload additional images</span>
                        <span className="block text-sm text-gray-500">Select multiple files</span>
                      </Label>
                      <Input
                        id="additionalImages"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleAdditionalImagesChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Images Preview */}
                {additionalImagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {additionalImagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview ? URL.createObjectURL(preview) : "/placeholder.svg"}
                          alt={`Additional preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => removeAdditionalImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full flex" size="lg" disabled={!isFormValid}>
                  Add Item
                  {loading && (
                              <Image
                                src="/assets/icons/loader.svg"
                                alt="loading"
                                width={20}
                                height={20}
                                className="ml-2 animate-spin"
                              ></Image>
                            )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {showSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">Item successfully added!</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
