const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-theme">
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
