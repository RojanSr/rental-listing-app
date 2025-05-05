import { Building2, MapPin, Mountain } from 'lucide-react'
import type { Ref } from 'react'

type SearchSuggestionsProps = {
  open: boolean
  ref: Ref<HTMLDivElement>
}

const INITIAL_SUGGESTED_PLACES = [
  {
    id: 1,
    name: 'Nearby',
    description: "Find what's around you",
    icon: MapPin,
    colorCode: '62, 127, 179',
  },
  {
    id: 2,
    name: 'Kathmandu, Nepal',
    description: 'For city services',
    icon: Building2,
    colorCode: '13, 109, 25',
  },
  {
    id: 3,
    name: 'Pokhara, Nepal',
    description: 'For nature-lovers',
    icon: Mountain,
    colorCode: '62, 127, 179',
  },
]

const SearchSuggestions = ({ open, ref }: SearchSuggestionsProps) => {
  return (
    <div
      ref={ref}
      className={`absolute top-full left-0 min-w-md mt-2 rounded-3xl p-4 bg-white shadow-lg border border-gray-200 origin-top transform transition-all duration-300 ease-in-out ${
        open
          ? 'scale-y-100 opacity-100 pointer-events-auto'
          : 'scale-y-0 opacity-0 pointer-events-none'
      }`}
    >
      <p className="text-sm">Suggested places</p>

      {INITIAL_SUGGESTED_PLACES?.map((item) => (
        <div
          key={item.id}
          className="flex gap-3 items-center mt-3 hover:bg-zinc-100 p-2 rounded-2xl"
        >
          <div
            className="w-12 h-12 rounded-md grid place-items-center"
            style={{ backgroundColor: `rgba(${item.colorCode}, 0.2)` }}
          >
            <item.icon color={`rgb(${item.colorCode})`} />
          </div>
          <div>
            <p className="font-medium text-md">{item.name}</p>
            <p className="text-zinc-500 text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchSuggestions
