type TProps = {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  isConnected: boolean
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
}

export function Form({ input, setInput, isConnected, handleSubmit }: TProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black/15 backdrop-blur-md fixed bottom-0 left-0 right-0 flex h-14 p-1 box-border text-xl"
    >
      <input
        value={input}
        placeholder="your message goes here"
        onChange={e => setInput(e.target.value)}
        disabled={!isConnected}
        autoComplete="off"
        className="flex-1 border-none px-4 rounded-full mx-1 outline-none"
      />
      <button
        type="submit"
        className="bg-gray-800 text-white border-none px-8 mx-1 rounded cursor-pointer hover:bg-gray-700 transition selection:none"
      >
        Send
      </button>
    </form>
  )
}
