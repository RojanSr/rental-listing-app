import { CustomAlertDialog } from '@/components/feedback/CustomAlertDialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PropertyStatus } from '@/enums/post'
import { cn, getPropertyStatusLabel } from '@/lib/utils'
import type { ListingCardType } from '@/types'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { type ColumnDef } from '@tanstack/react-table'
import { EyeIcon, Trash2Icon } from 'lucide-react'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const userPostColumns = (
  deleteProperty: UseMutateAsyncFunction<
    void,
    Error,
    {
      postId: string
    },
    unknown
  >,
): ColumnDef<ListingCardType>[] => {
  return [
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
      accessorKey: 'propertyStatus',
      header: 'Review Status',
      cell: ({ row }) => {
        const propertyStatus = row.original.propertyStatus
        const isRejected = propertyStatus === PropertyStatus.Rejected
        const isApproved = propertyStatus === PropertyStatus.Approved
        return (
          <Badge
            className={cn('bg-neutral-300 text-neutral-700', {
              'bg-green-300 text-neutral-700': isApproved,
              'bg-red-400': isRejected,
            })}
          >
            {getPropertyStatusLabel(row.original.propertyStatus)}
          </Badge>
        )
      },
    },
    {
      accessorKey: '',
      header: 'Action',
      cell: ({ row }) => {
        return (
          <div className="hstack gap-3">
            <Link to={'/post/$postId'} params={{ postId: row.original.id }}>
              <Button
                variant={'outline'}
                className="rounded-full cursor-pointer border-neutral-600 text-neutral-600 hover:bg-neutral-600/5 hover:text-neutral-600"
              >
                <EyeIcon />
                View
              </Button>
            </Link>
            <CustomAlertDialog
              title={`Delete this post?`}
              confirmLabel="Delete"
              onConfirm={() => {
                deleteProperty({
                  postId: row.original.id,
                })
              }}
            >
              <Button
                variant={'outline'}
                className="rounded-full cursor-pointer border-theme text-theme hover:bg-theme/10 hover:text-theme"
              >
                <Trash2Icon />
                Delete
              </Button>
            </CustomAlertDialog>
          </div>
        )
      },
    },
  ]
}
