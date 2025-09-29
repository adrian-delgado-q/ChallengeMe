import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
} from '@chakra-ui/react';

interface BaseModalProps {
  /** Modal open state */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | { base: string; md: string };
  /** Hide the close button */
  hideCloseButton?: boolean;
  /** Primary action button text */
  primaryText?: string;
  /** Primary action handler */
  onPrimary?: () => void;
  /** Primary button loading state */
  isPrimaryLoading?: boolean;
  /** Primary button disabled state */
  isPrimaryDisabled?: boolean;
  /** Secondary action button text */
  secondaryText?: string;
  /** Secondary action handler (defaults to onClose) */
  onSecondary?: () => void;
  /** Hide footer */
  hideFooter?: boolean;
  /** Children content */
  children: React.ReactNode;
  /** Custom footer content */
  customFooter?: React.ReactNode;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  hideCloseButton = false,
  primaryText,
  onPrimary,
  isPrimaryLoading = false,
  isPrimaryDisabled = false,
  secondaryText = 'Cancel',
  onSecondary,
  hideFooter = false,
  children,
  customFooter,
}) => {
  const handleSecondary = onSecondary || onClose;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent mx={{ base: 4, md: 'auto' }} my={{ base: 4, md: 'auto' }}>
        {title && <ModalHeader>{title}</ModalHeader>}
        {!hideCloseButton && <ModalCloseButton />}

        <ModalBody py={title ? 4 : 8}>{children}</ModalBody>

        {!hideFooter && (customFooter || primaryText || secondaryText) && (
          <ModalFooter>
            {customFooter || (
              <HStack spacing={3}>
                {secondaryText && (
                  <Button variant="ghost" onClick={handleSecondary}>
                    {secondaryText}
                  </Button>
                )}
                {primaryText && (
                  <Button
                    colorScheme="blue"
                    onClick={onPrimary}
                    isLoading={isPrimaryLoading}
                    isDisabled={isPrimaryDisabled}
                  >
                    {primaryText}
                  </Button>
                )}
              </HStack>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
