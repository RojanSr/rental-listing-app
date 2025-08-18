// StepUploadImages.tsx
import React, { useRef, useEffect, useState } from 'react'
import { useFormContext, useController } from 'react-hook-form'
import { X, Plus } from 'lucide-react'
import type { ListingFormValues } from '.'

type PreviewItem = {
  id: string
  file: File
  url: string
}

const makeId = (file: File, idx: number) =>
  `${file.name.replace(/\s+/g, '_')}-${file.lastModified}-${idx}`

export const StepUploadImages: React.FC = () => {
  // <-- give the correct form value type to useFormContext
  const { control } = useFormContext<ListingFormValues>()

  // useController without 'any' — name is a valid key of ListingFormValues
  const {
    field: { value: images = [], onChange: setImages },
  } = useController({
    name: 'images' as const,
    control,
    defaultValue: [] as File[],
  })

  // rest of component unchanged...
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [previews, setPreviews] = useState<PreviewItem[]>([])
  const maxFiles = 12
  const minRequired = 5

  useEffect(() => {
    const created = images.map((file, i) => ({
      id: makeId(file, i),
      file,
      url: URL.createObjectURL(file),
    }))
    setPreviews(created)

    return () => {
      created.forEach((p) => {
        if (p.url.startsWith('blob:')) URL.revokeObjectURL(p.url)
      })
    }
  }, [images])

  const addFiles = (files: FileList | null) => {
    if (!files) return
    const fileArray = Array.from(files)
    const existingKeySet = new Set(
      images.map((f) => `${f.name}-${f.size}-${f.lastModified}`),
    )
    const newFiles = fileArray.filter(
      (f) => !existingKeySet.has(`${f.name}-${f.size}-${f.lastModified}`),
    )
    const next = [...images, ...newFiles].slice(0, maxFiles)
    setImages(next)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files)
    e.currentTarget.value = ''
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    addFiles(e.dataTransfer.files)
  }
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const removeAt = (index: number) => {
    const next = images.filter((_, i) => i !== index)
    setImages(next)
  }

  const triggerFileSelect = () => inputRef.current?.click()
  const isValid = images.length >= minRequired

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-center mb-6">
        <p className="text-3xl font-semibold">Add Images</p>
        <p className="text-neutral-700 text-md mt-1">
          Upload at least {minRequired} clear photos to showcase your property
        </p>
      </div>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className={`w-full max-w-4xl p-6 rounded-2xl border-2 border-dashed transition-colors border-gray-300 bg-white`}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={triggerFileSelect}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') triggerFileSelect()
          }}
          className="flex flex-col md:flex-row items-center gap-6 justify-between cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-gray-100">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium">Drag & drop images here</p>
              <p className="text-sm text-neutral-500">
                or click to select from your device
              </p>
            </div>
          </div>

          <div className="text-sm text-neutral-500">
            {images.length} / {maxFiles} selected
          </div>
        </div>

        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept="image/*"
          multiple
          onChange={onInputChange}
        />

        {/* thumbnails */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          {previews.map((p, idx) => (
            <div
              key={p.id}
              className="relative w-full h-28 rounded-lg overflow-hidden border bg-gray-50"
            >
              <img
                src={p.url}
                alt={`preview-${idx}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeAt(idx)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* placeholders until minRequired thumbnails show visually */}
          {Array.from({
            length: Math.max(0, minRequired - previews.length),
          }).map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="flex items-center justify-center h-28 rounded-lg border border-dashed border-neutral-200 text-neutral-400"
            >
              + Add
            </div>
          ))}
        </div>

        {!isValid && (
          <p className="mt-4 text-sm">
            Please upload at least {minRequired} images.
          </p>
        )}
      </div>
    </div>
  )
}
