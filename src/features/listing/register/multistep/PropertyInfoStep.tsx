import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Upload, X } from 'lucide-react'
import type { ShedRegisterCommonProps } from './types'
import { useDebounce } from '@/hooks/useDebounce'
import { useSearchLocations } from '@/api/services/geocoding/queries'
import AddressSuggestion from './AddressSuggestion'
import { useState } from 'react'

const PropertyInfoStep = ({
  formData,
  setFormData,
}: ShedRegisterCommonProps) => {
  const [showAddressSuggestion, setShowAddressSuggestion] = useState(false)
  const debouncedAddressSearch = useDebounce(formData.address, 500)

  const locationSuggestion = useSearchLocations(
    {
      text: debouncedAddressSearch,
    },
    {
      enable:
        !!debouncedAddressSearch && !formData.latitude && !formData.longitude,
    },
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      const newUrls = newFiles.map((file) => URL.createObjectURL(file))
      setFormData((prev) => ({
        ...prev,
        images: {
          rentalImages: [...prev.images.rentalImages, ...newFiles],
          src: [...prev.images.src, ...newUrls],
        },
      }))
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...formData.images.rentalImages]
    const newUrls = [...formData.images.src]

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newUrls[index])

    newImages.splice(index, 1)
    newUrls.splice(index, 1)

    setFormData({
      ...formData,
      images: {
        rentalImages: newImages,
        src: newUrls,
      },
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Property Info</h2>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="shortDescription">Title</Label>
          <Input
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                shortDescription: e.target.value,
              }))
            }
            placeholder="Enter property title"
            maxLength={40}
            required
          />
        </div>

        <div className="relative grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            onFocus={() => setShowAddressSuggestion(true)}
            onBlur={() => {
              setTimeout(() => setShowAddressSuggestion(false), 200)
            }}
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                address: e.target.value,
                latitude: null,
                longitude: null,
              }))
            }
            placeholder="Enter property address"
            required
          />
          <div
            className={`absolute z-50 top-full left-0 min-w-md mt-2 rounded-3xl p-4 bg-white shadow-sm border border-gray-200 origin-top transform transition-all duration-300 ease-in-out ${showAddressSuggestion ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
          >
            <AddressSuggestion
              locationSuggestion={locationSuggestion}
              setSearch={(state) =>
                setFormData((prev) => ({
                  ...prev,
                  address: state.value,
                  latitude: state.lat || null,
                  longitude: state.lon || null,
                }))
              }
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Describe your property"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              id="numberOfRoom"
              value={formData.numberOfRoom}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  numberOfRoom: parseInt(e.target.value),
                }))
              }
              className="input border rounded px-3 py-2 w-18"
              placeholder="BHK"
              min="0"
            />
            <label htmlFor="bhk" className="text-sm">
              BHK
            </label>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: parseInt(e.target.value),
                }))
              }
              placeholder="Enter price"
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="images">Upload Images</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
            <Input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Label
              htmlFor="images"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-muted-foreground">
                (You can upload multiple images)
              </span>
            </Label>
          </div>

          {formData.images.src.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {formData.images.src.map((url, index) => (
                <div key={index} className="relative group aspect-square">
                  <img
                    src={url || '/placeholder.svg'}
                    alt={`Property image ${index + 1}`}
                    className="object-cover rounded-md w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyInfoStep
