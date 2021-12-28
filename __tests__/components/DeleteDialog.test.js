import {
    render,
    screen,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DeleteDialog } from '../../components'

describe('Delete Dialog', () => {
    beforeEach(async () => {
        render(
            <>
                <DeleteDialog
                    itemName='test item'
                    onConfirm={() => { }}
                />
                <div id='modal-root' />
            </>
        )

        const deleteBtn = screen.getByRole('button', { name: 'Delete' })
        userEvent.click(deleteBtn)
    })

    it('should render correctly', async () => {
        // Assert
        expect(screen.getByRole('dialog')).toHaveTextContent('Delete')
    })

    it('should close when clicked "X" button', async () => {
        // Action
        const xBtn = screen.getByLabelText('Close')
        userEvent.click(xBtn)

        // Assert
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should close when clicked "Cancel" button', async () => {
        // Action
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' })
        userEvent.click(cancelBtn)

        // Assert
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
})