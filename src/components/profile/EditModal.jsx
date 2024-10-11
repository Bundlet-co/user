/* eslint-disable react/prop-types */

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";


const EditModal = ( { isOpen = false, onOpenChange = () => { } } ) =>
{
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        { onClose => (
          <>
            <ModalHeader>
              Edit Profile
            </ModalHeader>
            <ModalBody>
              Hello world
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" color="danger" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditModal