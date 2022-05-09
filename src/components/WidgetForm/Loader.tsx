import { CircleNotch } from "phosphor-react";

export function Loader() {
	return (
		<div className="w-6 h-6 flex items-center justify-center overflow-hidden animate-spin">
			<CircleNotch 
				weight="bold" 
				className="w-5 h-4"
			/>
		</div>
	)
}