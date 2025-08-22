import { Button } from '@/components/ui/button'
import { BanIcon, UserIcon, UserRoundSearchIcon } from 'lucide-react'
import type { UserListType } from '@/api/services/app/types'
import { type ColumnDef } from '@tanstack/react-table'
import { CustomAlertDialog } from '@/components/feedback/CustomAlertDialog'
import type { UseMutateAsyncFunction } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const userColumns = (
  banUser: UseMutateAsyncFunction<
    void,
    Error,
    {
      userId: string
      payload: {
        isBanned: boolean
      }
    },
    unknown
  >,
): ColumnDef<UserListType>[] => {
  return [
    {
      accessorKey: 'fullName',
      header: 'Full Name',
    },
    {
      accessorKey: 'address',
      header: 'Address',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'isBanned',
      header: 'Is Banned',
      cell: ({ row }) => (row.original.isBanned ? 'Yes' : 'No'),
    },
    {
      accessorKey: '',
      header: 'Action',
      cell: ({ row }) => {
        const isBanned = row.original.isBanned
        return (
          <div className="hstack gap-3">
            <Link
              to={'/admin/users/manage/$profileId'}
              params={{ profileId: row.original.id }}
            >
              <Button
                variant={'outline'}
                className="rounded-full cursor-pointer border-neutral-600 text-neutral-600 hover:bg-neutral-600/10 hover:text-neutral-600"
              >
                <UserRoundSearchIcon />
                View Profile
              </Button>
            </Link>
            <CustomAlertDialog
              title={`Are you sure you want to ban ${row.original.fullName}?`}
              confirmLabel="Ban"
              onConfirm={() => {
                banUser({
                  userId: row.original.id,
                  payload: { isBanned: !isBanned },
                })
              }}
            >
              {row.original.isBanned ? (
                <Button
                  variant={'outline'}
                  className="rounded-full cursor-pointer border-green-700 text-green-700 hover:bg-green-700/10 hover:text-green-700"
                  disabled={!isBanned}
                >
                  <UserIcon />
                  Unban User
                </Button>
              ) : (
                <Button
                  variant={'outline'}
                  className="rounded-full cursor-pointer border-theme text-theme hover:bg-theme/10 hover:text-theme"
                  disabled={isBanned}
                >
                  <BanIcon />
                  Ban User
                </Button>
              )}
            </CustomAlertDialog>
          </div>
        )
      },
    },
  ]
}
