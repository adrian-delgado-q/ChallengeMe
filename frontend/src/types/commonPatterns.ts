// Common interface patterns extracted for better maintainability and consistency

// Base component props pattern
export interface BaseComponentProps {
    className?: string;
}

// Loading state pattern
export interface LoadingState {
    isLoading: boolean;
    error: string | null;
}

// Pagination props pattern
export interface PaginationData {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
}

// Modal/Dialog props pattern
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Form component props pattern
export interface FormComponentProps {
    onSubmit: (data: any) => void;
    onCancel?: () => void;
    isEditing?: boolean;
    initialData?: any;
    isLoading?: boolean;
}

// Grid/List component props pattern
export interface GridComponentProps {
    items: any[];
    loading?: boolean;
    error?: string;
    onItemSelect?: (id: string) => void;
}

// User/Profile related props pattern
export interface UserRelatedProps {
    userId?: string;
    user?: {
        id: string;
        username?: string;
        avatarUrl?: string;
        email?: string;
    };
}

// Team/Challenge membership props pattern
export interface MembershipProps {
    teamId?: string;
    challengeId?: string;
    isCreator?: boolean;
    isAdmin?: boolean;
    isMember?: boolean;
}

// Card component props pattern
export interface CardComponentProps extends BaseComponentProps {
    onClick?: () => void;
    isSelected?: boolean;
    isHoverable?: boolean;
}

// API Response pattern
export interface ApiResponse<T = any> {
    data?: T;
    error?: string;
    success?: boolean;
    message?: string;
}

// Search/Filter props pattern
export interface SearchFilterProps {
    searchQuery?: string;
    filterBy?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// Notification/Toast props pattern
export interface NotificationProps {
    title: string;
    description?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    isClosable?: boolean;
}

// Common dropdown/select option pattern
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

// File upload props pattern
export interface FileUploadProps {
    accept?: string;
    maxSize?: number;
    onUpload: (file: File) => void;
    onError?: (error: string) => void;
    isUploading?: boolean;
}

// Permission/Access control pattern
export interface AccessControlProps {
    requiredRole?: 'ADMIN' | 'MEMBER' | 'CREATOR';
    allowedRoles?: Array<'ADMIN' | 'MEMBER' | 'CREATOR'>;
    hasPermission?: boolean;
}

// Data table/list view props pattern
export interface DataTableProps<T = any> {
    data: T[];
    columns: Array<{
        key: string;
        label: string;
        sortable?: boolean;
        render?: (item: T) => React.ReactNode;
    }>;
    loading?: boolean;
    error?: string;
    onSort?: (key: string, order: 'asc' | 'desc') => void;
    onRowClick?: (item: T) => void;
}

// Stats/metrics display pattern
export interface StatsDisplayProps {
    stats: Array<{
        label: string;
        value: string | number;
        icon?: React.ReactNode;
        color?: string;
        trend?: 'up' | 'down' | 'neutral';
    }>;
}
