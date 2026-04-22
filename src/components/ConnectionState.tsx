type TProps = {
  isConnected: boolean
}


export function ConnectionState({ isConnected }: TProps) {
  return <p className="text-xl w-32"><span className={isConnected ? "text-green-400" : "text-red-400"}>{isConnected ? "Connected" : "Disconnected"}</span> </p>;
}