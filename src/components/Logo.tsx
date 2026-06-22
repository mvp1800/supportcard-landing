interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  stacked?: boolean
}

export default function Logo({ size = 'md', stacked = false }: LogoProps) {
  const iconPx = { sm: 28, md: 36, lg: 48 }[size]
  const textClass = { sm: 'text-base', md: 'text-[18px]', lg: 'text-xl' }[size]

  return (
    <a
      href="#"
      className={`flex ${stacked ? 'flex-col' : 'flex-row'} items-${stacked ? 'start' : 'center'} gap-2.5 text-brand font-bold no-underline`}
      style={{ textDecoration: 'none' }}
    >
      <div
        className="flex-shrink-0 bg-brand flex items-center justify-center"
        style={{ width: iconPx, height: iconPx, borderRadius: 8 }}
      >
        <svg viewBox="0 0 24 24" fill="white" width={iconPx * 0.52} height={iconPx * 0.52}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <span className={`${textClass} leading-tight`}>
        {stacked ? (
          <>
            Support<br />Card
          </>
        ) : (
          'Support Card'
        )}
      </span>
    </a>
  )
}
