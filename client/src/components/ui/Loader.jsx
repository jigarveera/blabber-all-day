export default function Loader() {
  return (
    <div
      className="grid min-h-screen place-items-center bg-[#191518] text-[#f5ede3]"
      role="status"
      aria-label="Loading page"
    >
      <span className="size-8 animate-spin rounded-full border-2 border-[#aa769a] border-t-transparent" />
    </div>
  )
}
