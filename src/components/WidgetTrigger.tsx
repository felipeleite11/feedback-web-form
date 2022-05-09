import { ChatTeardropDots } from 'phosphor-react'
import { Popover } from '@headlessui/react'

import { WidgetForm } from './WidgetForm'
import { GlobalProvider } from '../contexts/GlobalContext'

export function WidgetTrigger() {	
	return (
		<Popover className="absolute bottom-4 right-4 flex flex-col items-end md:bottom-8 md:right-8">
			<Popover.Panel>
				<GlobalProvider>
					<WidgetForm />
				</GlobalProvider>
			</Popover.Panel>

			<Popover.Button className="flex bg-brand-500 rounded-full px-3 h-12 text-white items-center group">
				<ChatTeardropDots className="w-6 h-6" />

				<span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
					Feedback
				</span>
			</Popover.Button>
		</Popover>
	)
}