import { useState } from 'react'
import {
	CancelButton,
	DeleteButton,
	Modal,
} from './index'

export const DeleteDialog = (props) => {
	const {
		itemName,
		onConfirm,
	} = props
	const [isOpen, setIsOpen] = useState(false)

	const handleConfirm = () => {
		setIsOpen(false)
		onConfirm()
	}

	return (
		<>
			<DeleteButton onClick={() => setIsOpen(true)}>
                Delete
			</DeleteButton>
			<Modal
				title='Delete'
				description={
					<p>
                        Are you sure you want to delete <b>{itemName}</b>?
					</p>
				}
				footer={
					<>
						<CancelButton onClick={() => setIsOpen(false)}>
                            Cancel
						</CancelButton>
						<DeleteButton onClick={handleConfirm}>
                            Delete
						</DeleteButton>
					</>
				}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</>
	)
}