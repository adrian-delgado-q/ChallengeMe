import React from 'react';
import { Button, HStack, Text, Select, Box, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
    showPageSizeSelector?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    showPageSizeSelector = true
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Don't show pagination if there's only one page
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show smart pagination with ellipsis
            if (currentPage <= 3) {
                // Show first pages
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Show last pages
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Show middle pages
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <Box>
            <HStack justify="space-between" align="center" flexWrap="wrap" gap={4}>
                {/* Items info and page size selector */}
                <HStack spacing={4} flexWrap="wrap">
                    <Text fontSize="sm" color="gray.600" minW="fit-content">
                        Showing {startItem}-{endItem} of {totalItems}
                    </Text>

                    {showPageSizeSelector && (
                        <HStack spacing={2} minW="fit-content">
                            <Text fontSize="sm" color="gray.600">Show:</Text>
                            <Select
                                size="sm"
                                value={itemsPerPage}
                                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                                width="auto"
                                minW="70px"
                            >
                                <option value={8}>8</option>
                                <option value={12}>12</option>
                                <option value={16}>16</option>
                                <option value={24}>24</option>
                            </Select>
                        </HStack>
                    )}
                </HStack>

                {/* Pagination controls */}
                <HStack spacing={1}>
                    {/* Previous button */}
                    <IconButton
                        aria-label="Previous page"
                        icon={<ChevronLeftIcon />}
                        size="sm"
                        variant="ghost"
                        isDisabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                    />

                    {/* Page numbers */}
                    {getVisiblePages().map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <Text px={2} fontSize="sm" color="gray.400">...</Text>
                            ) : (
                                <Button
                                    size="sm"
                                    variant={currentPage === page ? 'solid' : 'ghost'}
                                    colorScheme={currentPage === page ? 'orange' : 'gray'}
                                    onClick={() => onPageChange(page as number)}
                                    minW="32px"
                                >
                                    {page}
                                </Button>
                            )}
                        </React.Fragment>
                    ))}

                    {/* Next button */}
                    <IconButton
                        aria-label="Next page"
                        icon={<ChevronRightIcon />}
                        size="sm"
                        variant="ghost"
                        isDisabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                    />
                </HStack>
            </HStack>
        </Box>
    );
};
