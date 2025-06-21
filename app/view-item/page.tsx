"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ItemDetailsModal } from "@/components/item-details-modal"
import { getfiles } from "@/lib/useractions/action"

 interface Item {
  id: string
  itemName: string
  itemType: string
  itemDescription: string
  coverImage: string
  additionalImages: string[]
  dateAdded: Date
}

export default function ViewItemsPage() {

  const [items,setitems] = useState<Item[]>([])
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
        const itemsdata = await getfiles()
        console.log(itemsdata, ' THIS IS THE ITEMS DATA WE GOT')
        const mappedItems = itemsdata.documents.map((doc: any) => {
          return {
            id: doc.$sequence,
            itemName: doc.name,
            itemType: doc['item-type'],
            itemDescription: doc['item-description'],
            coverImage: doc['cover-image-url'],
            additionalImages: doc['extra-images'] || [],
            dateAdded: doc['$updatedAt'] ? new Date(doc['$updatedAt']) : new Date(),
          }
        })
        setitems(mappedItems)
    }

    fetchItems()
  }, [])




  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">View Items</h1>
          <p className="text-gray-600">Browse through all available items in the inventory.</p>
        </div>

        {/* Search Bar */}
        {/* <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div> */}

        {/* Items Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {/* Showing {filteredItems.length} of {items.length} items */}
            showing {items.length} items
          </p>
        </div>

        {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group"
                onClick={() => setSelectedItem(item)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg ">
                    <img
                      src={item.coverImage || "/placeholder.svg?height=300&width=300"}
                      alt={item.itemName}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.itemType}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.itemName}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.itemDescription}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{item.dateAdded.toLocaleDateString()}</span>
                      <div className="flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        {/* Item Details Modal */}
        {selectedItem && (
          <ItemDetailsModal item={selectedItem} isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </div>
    </div>
  )
}
