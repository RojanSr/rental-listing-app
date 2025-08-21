import { Button } from '@/components/ui/button'
import type { ListingCardType } from '@/types'
import { Link } from '@tanstack/react-router'
import { type ColumnDef } from '@tanstack/react-table'
import { SearchIcon } from 'lucide-react'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ListingCardType>[] = [
  {
    accessorKey: 'shortDescription',
    header: 'Title',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'roomCategory',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price (NRp)',
  },
  {
    accessorKey: 'numberOfRoom',
    header: 'Number of Room(s)',
  },
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className="hstack gap-4">
          <Link
            to="/admin/posts/pending/$postId"
            params={{ postId: row.original.id }}
          >
            <Button
              variant={'outline'}
              className="rounded-full cursor-pointer !z-50 border-theme text-theme hover:bg-theme/10 hover:text-theme"
              onClick={() => console.log('hello')}
            >
              <SearchIcon />
              Review
            </Button>
          </Link>
        </div>
      )
    },
  },
]
