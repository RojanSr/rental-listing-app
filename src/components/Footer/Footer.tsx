import { AppLogo } from '../Logo'
import {
  Phone as PhoneIcon,
  Mail as MailIcon,
  MapPin as MapPinIcon,
} from 'lucide-react'

const Footer = () => {
  return (
    <footer className="pt-8 px-4 flex flex-col text-zinc-400 bg-black">
      <div className="mx-auto w-full max-w-[1800px] p-4 lg:px-8">
        <div className="flex gap-6 justify-between flex-grow pb-12  border-solid border-b-[1px] border-b-zinc-700 flex-wrap">
          <div className="flex flex-col gap-4">
            <AppLogo />
            <div className="flex items-center gap-3">
              <PhoneIcon />
              <p>9818754576</p>
            </div>
            <div className="flex items-center gap-3">
              <MailIcon />
              <p>basobaas@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPinIcon />
              <p>Kathmandu, Nepal</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-zinc-300">Information</p>
            <p>My Account</p>
            <p>Login</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-zinc-300">Services</p>
            <p>About Us</p>
            <p>Careers</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-zinc-300">Subscribe</p>
            <p>
              Enter your email below to be the first to know about new upcomings
            </p>
            <input
              placeholder="Your Email"
              className="bg-transparent border-solid border-2 border-zinc-600 rounded-lg p-3 outline-none"
            />
          </div>
        </div>
        {/* <div className="py-4 flex flex-wrap justify-between gap-3"> */}
        <p className="text-center my-4">
          ©2025 BasoBaas All Rights are reserved
        </p>
        {/* </div> */}
      </div>
    </footer>
  )
}

export default Footer
