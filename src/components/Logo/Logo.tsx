import AppLogo from '/favicon.svg'

const Logo = () => {
  return (
    <div className="flex items-end gap-3 text-theme">
      <img src={AppLogo} className="h-12" />
      <p className={'select-none font-normal'}>
        <span
          className="text-2xl md:text-4xl font-semibold"
          style={{
            fontFamily: 'Ubuntu',
          }}
        >
          GharBaas
        </span>
        .com
      </p>
    </div>
  )
}

export default Logo
