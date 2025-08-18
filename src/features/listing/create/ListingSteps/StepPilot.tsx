import HomeBuildUpVideo from '@/assets/video/home_build_up.mp4'

export const StepPilot = () => {
  return (
    <div className="flex items-center justify-center gap-12">
      <div>
        <p className="text-6xl font-semibold">Tell us about your place</p>

        <p className="text-xl font-normal my-6 w-[60ch]">
          In this step, we'll ask you which type of property you have. Then let
          us know the location and more info.
        </p>
      </div>
      <video src={HomeBuildUpVideo} width={700} autoPlay muted playsInline />
    </div>
  )
}
