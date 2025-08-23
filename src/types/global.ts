export type Category = 'room' | 'flat' | 'apartment' | 'house'

export type GlobalResponse<T> = {
  success: boolean
  status: number
  message: string
  data: T
}

export type DivClassName = React.HTMLAttributes<HTMLDivElement>['className']
