import { useRef, useState } from 'react'
import SearchSuggestions from './SearchSuggestions'
import { Input } from '@/components/ui/input'

const LandingSearch = () => {
  const [isFocused, setIsFocused] = useState(false)
  const wrapperRef = useRef(null)
  return (
    <>
      <div className="flex w-full justify-center items-center">
        <div className="relative">
          <Input
            placeholder="Find homes in your dream location"
            className="outline-2 rounded-full p-6 w-3xs md:w-2xl text-sm md:text-[16px] font-medium placeholder:font-normal"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <SearchSuggestions open={isFocused} ref={wrapperRef} />
        </div>
      </div>
    </>
  )
}

export default LandingSearch
